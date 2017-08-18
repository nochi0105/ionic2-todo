import {ElementRef, Directive, OnInit, Renderer2, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[appBSButton]'
})
export class BSButtonDirective implements OnInit {
  @Input() appBSButton;
  @Input() mouseDownClass;
  @Input() mouseUpClass;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.appBSButton = this.appBSButton || 'primary';
    this.mouseDownClass = this.mouseDownClass || 'default';
    this.mouseUpClass = this.mouseUpClass || this.appBSButton;
    this.renderer.addClass(this.el.nativeElement, 'btn');
    this.renderer.addClass(this.el.nativeElement, `btn-${this.appBSButton}`);
  }

  @HostListener('mousedown') onMouseDown() {
    this.renderer.removeClass(this.el.nativeElement, `btn-${this.appBSButton}`);
    this.renderer.addClass(this.el.nativeElement, `btn-${this.mouseDownClass}`);
  }

  @HostListener('mouseup') onMouseUp() {
    this.renderer.removeClass(this.el.nativeElement, `btn-${this.mouseDownClass}`);
    this.renderer.addClass(this.el.nativeElement, `btn-${this.mouseUpClass}`);
  }
}
