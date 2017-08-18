import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
})
export class TimeComponent implements OnInit {
  @Input() format: string;
  date;

  constructor() {

    this.setDate();
    setInterval(() => {
      this.setDate();
    }, 1000);
  }

  ngOnInit() {
  }

  private setDate() {
    this.date = new Date();
  }
}
