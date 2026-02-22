import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itodo } from '../interface/itodo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  db_url = 'https://raw.githubusercontent.com/Moustafa4/ToDo/refs/heads/master/public/db/db.json';
  constructor(private _HttpClient: HttpClient) {}

  gettodos(): Observable<Itodo[]> {
    return this._HttpClient.get<{ Todo: Itodo[] }>(this.db_url).pipe(
      map((res) => res.Todo ?? []),
      map((todo) => todo.filter((comp) => comp.iscomp === false)),
    );
  }
  getCompletetodos(): Observable<Itodo[]> {
    return this._HttpClient.get<{ Todo: Itodo[] }>(this.db_url).pipe(
      map((res) => res.Todo ?? []),
      map((todo) => todo.filter((comp) => comp.iscomp === true) ?? []),
    );
  }

  // createto(todo: Itodo): Observable<Itodo> {
  //   return this._HttpClient.post<Itodo>(this.db_url, todo);
  // }

  // updatetodo(todo: Itodo): Observable<Itodo> {
  //   return this._HttpClient.put<Itodo>(`${this.db_url}/${todo.id}`, todo);
  // }

  // deltodo(todoid: string): Observable<void> {
  //   return this._HttpClient.delete<void>(`${this.db_url}/${todoid}`);
  // }
}
