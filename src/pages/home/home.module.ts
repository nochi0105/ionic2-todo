import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { HomePage } from './home';
import {TodoSearchComponent} from "./search/todo-search.component";
import {OrderbyPipe} from "../../pipes/orderby/orderby";
import {TodoDetailComponent} from "./detail/todo-detail.component";
import {ValidatorComponent} from "./validator/validator.component";
import {TodoDonePipe} from "./pipes/todo-done.pipe";
import {TodoService} from "./todo.service";
import {TodoSearchService} from "./search/todo-search.service";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    HomePage,
    TodoSearchComponent,
    TodoDonePipe,
    OrderbyPipe,
    TodoDetailComponent,
    ValidatorComponent,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
  entryComponents: [
    TodoDetailComponent
  ],
  providers: [
    TodoService,
    TodoSearchService,
    Camera,
    File,
    FileChooser,
    FilePath,
  ]
})
export class HomePageModule {}
