import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolume';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{
  campoBusca = new FormControl()


  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      tap(() => console.log('Antes de chamar a API')),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap(() => console.log('Após chamar a Api')),
      map(items => this.livroResultadoParaLivros(items))
    )

  constructor(private service: LivroService) { }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}

