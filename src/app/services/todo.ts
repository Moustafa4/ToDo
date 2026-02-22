import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itodo } from '../interface/itodo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  db_url = 'http://localhost:3000/todo';
  constructor(private _HttpClient: HttpClient) {}

  gettodos(): Observable<Itodo[]> {
    return this._HttpClient.get<{ Todo: Itodo[] }>(this.db_url).pipe(
      map((res) => res.Todo ?? []),
      map((todo) => todo.filter((comp) => comp.iscomp === false)),
    );
  }
  getCompletetodos() {
    return this._HttpClient.get<{ Todo: Itodo[] }>(this.db_url).pipe(
      map((res) => res.Todo ?? []),
      map((todo) => todo.find((comp) => comp.iscomp === true) ?? []),
    );
  }
}
