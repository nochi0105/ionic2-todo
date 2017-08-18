import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appListenKeys]'
})
export class ListenKeysDirective implements OnInit {

  // 監視するキー、複数の場合はスペースで分割
  @Input() appListenKeys;
  @Output() keyupAction = new EventEmitter();
  @Output() keyhoverAction = new EventEmitter();
  @Input() stopPrevent = false;
  private _isHovering: boolean;

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

    if (this.stopPrevent) {
      event.preventDefault();
      event.stopPropagation();
    }

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

    if (this.appListenKeys.indexOf(this.code.toLowerCase()) !== -1) {
      this._isHovering = true;
      this.keyhoverAction.emit(this.code);
    }
  }

  @HostListener('window:keyup', ['$event']) keyboardOutput(event: KeyboardEvent) {

    if (this._isHovering) {
      this._isHovering = false;
      this.keyupAction.emit(this.code);
    }
  }

  constructor( ) { }

  ngOnInit(): void {
    this.appListenKeys = this.appListenKeys.toLowerCase().split(' ');
  }

}
