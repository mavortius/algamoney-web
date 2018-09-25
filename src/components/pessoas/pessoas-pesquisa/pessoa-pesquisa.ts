import { autoinject } from "aurelia-framework";

import { Pessoa } from "core/model";
import { PessoaFiltro, PessoaService } from "core/services/pessoa-service";

@autoinject()
export class PessoaPesquisa {
  pessoas: Array<Pessoa> = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(private service: PessoaService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });
  }
}
