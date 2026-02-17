import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

defineLocale('en-gb', enGbLocale);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BsDatepickerModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  bsInlineValue: Date = new Date();
  editingIndex: number | null = null;
  isedit = false;

  bsConfig = {
    firstDayOfWeek: 6,
    showWeekNumbers: true,
    isAnimated: false,
  };

  constructor(
    private localeservice: BsLocaleService,
    private cdr: ChangeDetectorRef,
  ) {
    this.localeservice.use('en-gb');
  }

  tasks: { title: string; detail: string; date: string }[] = [];
  newtask = '';
  newdes = '';

  add() {
    if (this.newtask.trim() && this.newtask.length >= 3) {
      const taskData = {
        title: this.newtask,
        detail: this.newdes,
        date: this.bsInlineValue ? this.bsInlineValue.toISOString().split('T')[0] : '',
      };

      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex] = taskData;
        this.editingIndex = null;
      } else {
        this.tasks.push(taskData);
      }
      this.newtask = '';
      this.newdes = '';
      this.bsInlineValue = new Date();
    }
  }
  remove(index: number) {
    this.tasks.splice(index, 1);
    this.cdr.detectChanges();
  }
  edit(index: number, taskedit: { title: string; detail: string; date: string }) {
    this.newtask = taskedit.title;
    this.newdes = taskedit.detail;
    this.bsInlineValue = new Date(taskedit.date);
    this.editingIndex = index;
    this.isedit = true;
  }
}
