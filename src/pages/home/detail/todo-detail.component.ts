/**
 * Created by nochi0105 on 17/07/12.
 */
import { Todo } from '../todo';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, NavController, NavParams, Platform, Slides} from 'ionic-angular';
import {TodoService} from '../todo.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {NgForm} from "@angular/forms";
import { LoadingController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.html',
})


export class TodoDetailComponent implements OnInit {
  @ViewChild('todoForm') public todoForm: NgForm;
  @ViewChild('slider') private slider: Slides;
  todo: Todo;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: TodoService,
    private camera: Camera,
    private platForm: Platform,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {
    const id = parseInt(this.navParams.get('id'));
    if (id) {
      this.service.getTodo(id)
        .then(todo => this.todo = todo)
      ;
    } else {
      this.todo = new Todo((new Date()).getTime(), '', '', false);
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('Modify your album'),
      buttons: [
        {
          text: this.translate.instant('From Library'),
          role: 'destructive',
          handler: () => {
            this.fileChoose();
          }
        },{
          text: this.translate.instant('Take a picture'),
          handler: () => {
            this.takePhoto();
          }
        },{
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.service.update(this.todo)
        .then(() => this.goBack())
      ;
    }
  }

  private goBack(): boolean {
    if (this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot('Home');
      this.navCtrl.popToRoot();
    }
    return false;
  }

  fileChoose(): void {
    this.fileChooser.open()
      .then(uri => {

        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.todo.images.unshift({src: filePath});
            this.ngAfterViewInit();
          })
          .catch(err => console.log(err));

      })
      .catch(e => this.todo.text = e);
  }

  takePhoto(): void {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true  //Corrects Android orientation quirks
    };

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.camera.getPicture(options)
      .then(
        (image_url) => {
          this.todo.images.unshift({src: image_url });
          this.ngAfterViewInit();
          loading.dismiss();
        },
        (err) => console.error(err)
      );
  }
}
