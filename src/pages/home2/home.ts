/**code is far away from bug with the animal protecting
 *         ┌─┐       ┌─┐
 *      ┌──┘ ┴───────┘ ┴──┐
 *      │                 │
 *      │       ───       │
 *      │  ─┬┘       └┬─  │
 *      │                 │
 *      │       ─┴─       │
 *      │                 │
 *      └───┐         ┌───┘
 *          │         │
 *          │         │  神兽保佑
 *          │         │  代码无BUG!
 *          │         └──────────────┐
 *          │                        │
 *          │                        ├─┐
 *          │                        ┌─┘
 *          │                        │
 *          └─┐  ┐  ┌───────┬──┐  ┌──┘
 *            │ ─┤ ─┤       │ ─┤ ─┤
 *            └──┴──┘       └──┴──┘
 * Created by nochi0105 on 17/08/01.
 */
import {Component, OnInit} from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import {TodoSearchService} from './search/todo-search.service';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TodoSearchService],
})
export class HomePage implements OnInit {
  term: string;
  todoItems: Todo[] = [];
  // 最初の呼び出しメソッド
  currentList = 'getTodoItems';

  // Mouse down flag of list
  list_hold = false;

  timeout_id;

  constructor(
    private service: TodoService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
  ) { }

  /**
   * Runs when the page has fully entered and is now the active page.
   * This event will fire, whether it was the first load or a cached page.
   */
  ionViewDidEnter() {
    this.ngOnInit();
  }

  presentConfirm(todoItems: Todo[]) {
    let message = [];
    todoItems.forEach(todo => message.push(todo.title));
    let alert = this.alertCtrl.create({
      title: '削除確認',
      message: message.join('\n'),
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '削除',
          handler: () => {
            console.log('削除 clicked');
            todoItems.forEach(todo => this.deleteItem(todo));
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
    if (this[this.currentList]) {
      this[this.currentList]();
    }
  }

  /**
   * 一覧
   */
  getTodoItems(): void {
    this.currentList = 'getTodoItems';
    this.service
      .getTodoItems()
      .then(todoItems => this.todoItems = this.termFilter(todoItems));
  }

  termFilter(todoItems: Todo[]): Todo[] {
    if (!!this.term) {
      todoItems = todoItems.filter(todo => todo.title.toLowerCase().includes(this.term.toLowerCase()));
    }
    return todoItems;
  }

  /**
   * 完了リスト一覧
   */
  getFinishItems(): void {
    this.currentList = 'getFinishItems';
    this.service.getTodoItems()
      .then(todoItems => this.todoItems = this.termFilter(todoItems).filter(todo => todo.done === true));
  }

  /**
   * 未完了リスト一覧
   */
  getUnFinishItems(): void {
    this.currentList = 'getUnFinishItems';
    this.service.getTodoItems()
      .then(todoItems => this.todoItems = this.termFilter(todoItems).filter(todo => todo.done === false));
  }
  /**
   * todoを削除
   * @param todo
   */
  deleteItem(todo: Todo): void {
    todo.deleted = new Date();
    this.service.delete(todo.id)
      .then(() => {
        this.todoItems = this.todoItems.filter(h => h !== todo)
      });
  }

  gotoDetail(id: number): void {
    this.navCtrl.push('TodoDetail',{id: id})
  }

  getTimeoutID(): any {
    this.timeout_id =
      setTimeout((
        () => {
          this.list_hold = true;
        }
      ), 500);
  }

  onTodoHold(): void {
    clearTimeout(this.timeout_id);
    this.getTimeoutID();
  }

  onTodoUp(todo: Todo, event): void {
    clearTimeout(this.timeout_id);
    switch (event.target.parentElement.tagName.toLowerCase()) {
      case 'button':
        this.presentConfirm([todo]);
        break;
      default:
        if (!this.list_hold) {
          this.gotoDetail(todo.id);
        }else {
          todo.is_checked = !todo.is_checked && true;
        }
    }
  }

  /**
   * 選択したリストに対してすべてdoneにする
   */
  allDone(): void {
    this.todoItems
      .filter(todo => todo.is_checked)
      .forEach(todo => {
        todo.done = true;
        todo.is_checked = false;
        this.service.update(todo);
      });
    this.list_hold = false;
    this.cancel();
  }

  /**
   * 選択したリストに足していすべてUndoにする
   */
  allUndo(): void {
    this.todoItems
      .filter(todo => todo.is_checked)
      .forEach(todo => {
        todo.done = false;
        todo.is_checked = false;
        this.service.update(todo);
      });
    this.cancel();
  }

  allDelete(): void {
    let checkedTodoItems = this.todoItems
      .filter(todo => todo.is_checked);
    checkedTodoItems
      .forEach(todo => {
        todo.is_checked = false;
      });

    this.presentConfirm(checkedTodoItems);
    this.cancel();
  }

  /**
   * 選択モードが解除された場合
   */
  cancel(code?: string): void {
    this.todoItems.forEach(todo => todo.is_checked = false);
    this.list_hold = false;
  }
}

