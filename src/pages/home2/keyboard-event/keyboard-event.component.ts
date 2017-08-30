import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-keyboard-event',
  templateUrl: './keyboard-event.component.html',
  // styleUrls: ['./keyboard-event.component.css'],
})
export class KeyboardEventComponent implements OnInit {

  keyboardEvent: any;
  altKey: boolean;
  charCode: number;
  code: string;
  ctrlKey: boolean;
  keyCode: number;
  metaKey: boolean;
  shiftKey: boolean;
  timeStamp: number;
  type: string;
  which: number;

  @HostListener('window:keydown', ['$event']) keyboardInput(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.keyboardEvent = event;
    this.altKey = event.altKey;
    this.charCode = event.charCode;
    this.code = event.code;
    this.ctrlKey = event.ctrlKey;
    this.keyCode = event.keyCode;
    this.metaKey = event.metaKey;
    this.shiftKey = event.shiftKey;
    this.timeStamp = event.timeStamp;
    this.type = event.type;
    this.which = event.which;
  }

  constructor() { }

  ngOnInit() {
  }

}
