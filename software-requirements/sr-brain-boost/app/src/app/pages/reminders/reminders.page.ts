import { Component, OnInit } from '@angular/core';
import { AddReminderComponent } from '../../components/add-reminder/add-reminder.component'
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  reminders = []

  constructor(public modalController: ModalController, private storage: Storage) {
    this.updateReminders();
  }

  ngOnInit() {
  }

  openReminderModal = () => {
    const modal = this.modalController.create({
      component: AddReminderComponent,
      cssClass: 'reminders-modal'
    }).then(modal => {
      modal.present();
      modal.onDidDismiss()
        .then(() => {
          this.updateReminders();
        });
    });
  }

  updateReminders = () => {
    this.storage.get('reminders').then(rem => {
      this.reminders = rem;
    });
  }

  deleteReminder = (reminderId) => {
    reminderId = parseInt(reminderId);
    this.storage.get('reminders').then(async rem => {
      let newRems = []
      await this.delay(1500);
      rem.forEach(reminder => {
        if (reminder.rem_id !== reminderId) {
          newRems.push(reminder)
        }
      });
      this.storage.set('reminders', newRems).then(() => {
        this.updateReminders();
      })
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
