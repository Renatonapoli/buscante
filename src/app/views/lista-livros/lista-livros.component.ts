import { ImageLinks, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolume';
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

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

