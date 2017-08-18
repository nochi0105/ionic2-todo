import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TimeComponent} from "../pages/home/time/time.component";
import {TodoDetailComponent} from "../pages/home/detail/todo-detail.component";
import {TodoSearchComponent} from "../pages/home/search/todo-search.component";
import {ListenKeysDirective} from "../pages/home/directive/listen-keys.directive";
import {KeyboardEventComponent} from "../pages/home/keyboard-event/keyboard-event.component";
import {BSButtonDirective} from "../pages/home/directive/bs-button.directive";
import {ValidatorComponent} from "../pages/home/validator/validator.component";
import {TodoDonePipe} from "../pages/home/pipes/todo-done.pipe";
import {TodoSearchService} from "../pages/home/search/todo-search.service";
import {TodoService} from "../pages/home/todo.service";

import {FileChooser} from "@ionic-native/file-chooser";
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";
import {OrderbyPipe} from "../pipes/orderby/orderby";

// ルーティング設定
const appRoutes = {
  links: [
    { component: HomePage, name: 'Home', segment: '' },
    { component: TodoDetailComponent, name: 'TodoDetail', segment: 'todo-detail/:id' }, //一般的な指定
    { component: ListPage, name: 'List', segment: 'list', defaultHistory: [HomePage]} //引数あり
  ]
};

@NgModule({
  declarations: [
    HomePage,
    ListPage,
    MyApp,

    TodoDetailComponent,
    TodoSearchComponent,
    TodoDonePipe,
    TimeComponent,
    ValidatorComponent,
    BSButtonDirective,
    KeyboardEventComponent,
    ListenKeysDirective,

    OrderbyPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule,
    IonicModule.forRoot(MyApp, {
      locationStrategy: "hash",
      // backButtonText: 'Go Back',
      // iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      platforms: {
        ios: {
          tabsPlacement: 'bottom',
        },
        android: {
          tabsPlacement: 'bottom',
        }
      },
      pageTransition: 'ios-transition',
    }, appRoutes),
  ],
  bootstrap: [IonicApp],
  // offline entry
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TodoDetailComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoService,
    TodoSearchService,
    Camera,
    File,
    FileChooser,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})

export class AppModule {}

