import { ImageLinks } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro
  listaLivros: Livro[];

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe(
      {
        next: items => {this.listaLivros = this.livroResultadoParaLivros(items)},
        error: erro => console.error(erro),
        complete: () => console.log('Chamada finalizada!')
      }
    )
  }

  livroResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = []

      items.forEach((item) => {
        livros.push(this.livro = {
          title: item.volumeInfo?.title,
          authors:item.volumeInfo?.authors,
          publisher:item.volumeInfo?.publisher,
          publishedDate:item.volumeInfo?.publishedDate,
          description:item.volumeInfo?.previewLink,
          previewLink:item.volumeInfo?.previewLink,
          thumbnail:item.volumeInfo?.imageLinks?.thumbnail
      })
    })

    return livros
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

