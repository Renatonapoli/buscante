import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, tap, throwError } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolume';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{
  campoBusca = new FormControl()
  mensagemErro = ''
  pausa = 300


  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.pausa),
      filter(valorDigitado => valorDigitado.length >= 3),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap(() => console.log('Após chamar a Api')),
      map(items => this.livroResultadoParaLivros(items)),
      catchError(erro => {
        console.log(erro)
        this.mensagemErro = 'Ops, aconteceu um error, recarregue a aplicação!'
        return EMPTY
        // return throwError(() =>
        //   new Error(this.mensagemErro = 'Ops, aconteceu um error, recarregue a aplicação!'))
      })
    )

  constructor(private service: LivroService) { }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}

