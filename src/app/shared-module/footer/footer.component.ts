import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() previousDay = '';
  @Input() nextDay = '';
  @Input() arr!: string[];
  @Output() changeDays = new EventEmitter();

  onClick(value: string) {
    let currentTab = this.arr.indexOf(value);
    // console.log(currentTab);
    this.changeDays.emit(currentTab);
  }
}
