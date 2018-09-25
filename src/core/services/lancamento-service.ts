import { autoinject } from "aurelia-framework";

import * as moment from 'moment';

import { ApiService } from './../../shared/services/api-service';
import { config } from "shared/config";
import { Lancamento } from "../model";

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

const resource = `${config}/lancamentos`;

@autoinject()
export class LancamentoService {

  constructor(private api: ApiService) { }

  perquisar(filtro: LancamentoFiltro) {
    let params = {
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    }

    if (filtro.descricao) {
      params['descricao'] = filtro.descricao;
    }

    if (filtro.dataVencimentoInicio) {
      params['dataVencimento'] = moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD');
    }

    if (filtro.dataVencimentoFim) {
      params['dataVencimento'] = moment(filtro.dataVencimentoFim).format('YYYY-MM-DD');
    }

    return this.api.get(resource, params);
  }

  buscarPorCodigo(codigo: number) {
    return this.api.get(`${resource}/${codigo}`)
    .then(data => {
      const lancamento = data;

      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  adicionar(lancamento: Lancamento) {
    return this.api.post(resource, lancamento);
  }

  atualizar(lancamento: Lancamento) {
    return this.api.put(`${resource}/${lancamento.codigo}`, lancamento)
    .then(data => {
      const lancamento = data;

      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  excluir(codigo: number) {
    return this.api.delete(`${resource}/${codigo}`);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
