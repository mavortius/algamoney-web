import { autoinject } from "aurelia-framework";

import { ApiService } from './../../shared/services/api-service';
import { config } from './../../shared/config';
import { Pessoa } from "../model";

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

const pessoaResource = `${config.api_url}/pessoas`;
const cidadeResource = `${config.api_url}/cidades`;
const estadoResource = `${config.api_url}/estados`;

@autoinject()
export class PessoaService {

  constructor(private api: ApiService) { }

  pesquisar(filtro: PessoaFiltro) {
    let params = {
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    };

    if (filtro.nome) {
      params['nome'] = filtro.nome;
    }

    return this.api.get(pessoaResource, params)
      .then(response => response.content);
  }

  listarTodas() {
    return this.api.get(pessoaResource)
    .then(response => response.content);
  }

  excluir(codigo: number) {
    return this.api.delete(`${pessoaResource}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean) {
    return this.api.put(`${pessoaResource}/${codigo}/ativo`, ativo);
  }

  adicionar(pessoa: Pessoa) {
    return this.api.post(pessoaResource, pessoa);
  }

  atualizar(pessoa: Pessoa) {
    return this.api.put(`${pessoaResource}/${pessoa.codigo}`, pessoa);
  }

  buscarPorCodigo(codigo: number) {
    return this.api.get(`${pessoaResource}/${codigo}`);
  }

  listarEstados() {
    return this.api.get(estadoResource);
  }

  pesquisarCidades(estado) {
    return this.api.get(cidadeResource, estado);
  }
}
