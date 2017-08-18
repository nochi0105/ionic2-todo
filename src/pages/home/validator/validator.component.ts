import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'validator',
  templateUrl: './validator.component.html',
})
export class ValidatorComponent implements OnInit {
  @Input() target: NgModel;

  constructor() { }

  ngOnInit() {
  }

}
