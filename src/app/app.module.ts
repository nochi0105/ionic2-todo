import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {TimeComponent} from "../pages/home/time/time.component";
import {TodoDetailComponent} from "../pages/home/detail/todo-detail.component";
import {ListenKeysDirective} from "../pages/home/directive/listen-keys.directive";
import {KeyboardEventComponent} from "../pages/home/keyboard-event/keyboard-event.component";
import {BSButtonDirective} from "../pages/home/directive/bs-button.directive";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import {HomePageModule} from "../pages/home/home.module";
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
// ルーティング設定
const appRoutes = {
  links: [
    { component: HomePage, name: 'Home', segment: '' },
    { component: TodoDetailComponent, name: 'TodoDetail', segment: 'todo-detail/:id' }, //一般的な指定
    { component: ListPage, name: 'List', segment: 'list', defaultHistory: [HomePage]}, //引数あり
    { component: LoginPage, name: 'Login', segment: 'login'}, //引数あり
    { component: SignupPage, name: 'Signup', segment: 'signup'} //引数あり
  ]
};

@NgModule({
  declarations: [
    ListPage,
    MyApp,
    LoginPage,
    SignupPage,

    TimeComponent,
    KeyboardEventComponent,
    ListenKeysDirective,
    BSButtonDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule,
    HomePageModule,
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
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    })
  ],
  bootstrap: [IonicApp],
  // offline entry
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})

export class AppModule {}

