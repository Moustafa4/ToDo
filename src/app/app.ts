import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  standalone: true, // مهم جدًا
  imports: [BsDatepickerModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // جمع مش مفرد
})
export class App {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker?: BsDatepickerDirective;

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
}
