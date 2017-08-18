import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {TodoSearchService} from './todo-search.service';
import {HomePage} from '../home';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {NavController} from "ionic-angular";

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
})
export class TodoSearchComponent implements OnInit {
  @Input() term: string;
  @Output() termChange = new EventEmitter<string>();
  observableTodoItems: Observable<Todo[]>;
  private searchTeams = new Subject<string>();

  constructor(
    private service: TodoSearchService,
    private todoItemsComponent: HomePage,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.observableTodoItems = this.searchTeams
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.service.search(term) : Observable.of<Todo[]>([]))
      .catch(error => {
        console.error(error);
        return Observable.of<Todo[]>([]);
      });
  }

  search(term: string): void {
    this.onKeyUp(term, null, (todoItems => this.todoItemsComponent.todoItems = todoItems));
  }

  // 検索キーワードをsearchTeamsに転送する
  onKeyUp(term: string, $event?, callback?: (todoItems: Todo[]) => void) {
    this.term = term.trim();
    this.termChange.emit(this.term);
    if (term.length === 0) {
      this.todoItemsComponent.getTodoItems();
      typeof callback === 'function' && callback(this.todoItemsComponent.todoItems);
      return;
    }

    this.searchTeams.next(term);

    if ( typeof callback === 'function' ) {
      this.observableTodoItems.subscribe(todoItems => callback(todoItems))
    }
  }


  /**
   * todoを追加
   */
  add(){
    this.navCtrl.push('TodoDetail');
  }

  gotoDetail(todo: Todo): void {
    this.navCtrl.push('TodoDetail', {id: todo.id})
  }
}
