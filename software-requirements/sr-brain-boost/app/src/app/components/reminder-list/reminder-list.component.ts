import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
})
export class ReminderListComponent implements OnInit {

  reminders = [{}]

  constructor() { }

  ngOnInit() {}

}
