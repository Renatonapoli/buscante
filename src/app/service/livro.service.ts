import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes?'

  constructor(private http: HttpClient) { }

  buscar(valor: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valor)
    return this.http.get<LivrosResultado>(this.API, {params})
      //.pipe(
      //   tap((retornoAPI) => console.log("Fluxo do TAP", retornoAPI)),
      //   map(resultado => resultado.items ?? []),
      //   tap(resultado => console.log("Fluxo após o map", resultado))
      // )
    }
  }
