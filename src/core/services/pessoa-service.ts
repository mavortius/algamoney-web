import { autoinject } from "aurelia-framework";

import { ApiService } from './../../shared/services/api-service';
import { config } from './../../shared/config';

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

    return this.api.get(pessoaResource, params);
  }
}
