/**
 * Created by nochi0105 on 17/07/12.
 */
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  key: string = 'todoItems';

  constructor() { }

  getTodoItems(): Promise<Todo[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem(this.key)) as Todo[] || [])
    ;
  }

  getTodo(id: number): Promise<Todo> {
    return Promise.resolve(
      this.getTodoItems()
      .then(todoItems => {
        const new_todoItems = todoItems.filter(todo => todo.id === id);
        return new_todoItems[0];
      })
    )
  }

  create(text: string): Promise<Todo> {
    return Promise.resolve(
      this.getTodoItems()
      .then(todoItems => {

        const todo = new Todo(todoItems.length + 1, text, text, false);
        todoItems.push(todo);
        localStorage.setItem(this.key, JSON.stringify(todoItems));

        return todo;
      })
    );
  }

  delete(id: number): Promise<void> {
    return Promise.resolve(
      this.getTodoItems()
        .then(todoItems => {
          localStorage.setItem(this.key, JSON.stringify(todoItems.filter(todo => todo.id !== id)));
        })
    ).catch(this.handleError);
  }

  update(todo: Todo): Promise<Todo> {
    return Promise.resolve(
      this.getTodoItems()
        .then(todoItems => {
          const newTodoItems = todoItems.filter(t => todo.id !== t.id);
          newTodoItems.push(todo);
          localStorage.setItem(this.key, JSON.stringify(newTodoItems));
          return todo;
        })

    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('エラー: ', error);
    return Promise.reject(error.message || error);
  }
}
