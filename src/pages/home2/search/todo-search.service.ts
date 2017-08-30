import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { Todo } from '../todo';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoSearchService {

  constructor() { }

  search(term: string): Observable<Todo[]> {
    const todoItems = JSON.parse(localStorage.getItem('todoItems'))
      .filter((todo) => {
        return todo.title.toLowerCase().includes(term.toLowerCase());
      });
    return Observable.of<Todo[]>(todoItems);
  }
}
