import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CR_ID_REGEXP, TOKEN_REGEXP } from '../../../const/regexp.constants';
import { UserService } from '../../services/user-service/user.service'
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-related-account',
  templateUrl: './add-related-account.component.html',
  styleUrls: ['./add-related-account.component.scss'],
})
export class AddRelatedAccountComponent implements OnInit {
  private relatedAccForm: FormGroup;
  tokenRegExp = new RegExp(TOKEN_REGEXP);
  idRegExp = new RegExp(CR_ID_REGEXP);

  constructor(public modalController: ModalController, private formBuilder: FormBuilder, private userService: UserService, private storage: Storage, public toastController: ToastController) {
    this.relatedAccForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(CR_ID_REGEXP)]],
      token: ['', [Validators.required, Validators.pattern(TOKEN_REGEXP)]],
    });
  }

  get form() { return this.relatedAccForm.controls }

  ngOnInit() { }

  closeModal = () => {
    this.modalController.dismiss()
  }

  isFormValid = () => {
    let currentUsername = this.form.username.value;
    let currentToken = this.form.token.value;
    return this.relatedAccForm.valid && this.idRegExp.test(currentUsername) && this.tokenRegExp.test(currentUsername);
  }

  linkAccount = () => {
    this.storage.get('current-user-id').then(current_user_id => {
      let linkReq = { main_user_id: current_user_id, liked_user_id: this.form.username.value, user_token: this.form.token.value }
      this.userService.linkAccount(linkReq)
        .subscribe((res: any) => {
          console.log(res.response)
          this.toastHandler(res.response.status, res.response.message);
        }, err => {
          console.log(err)
        });
    })
  }

  toastHandler = (statusCode, message) => {

    let toastColor = (statusCode === 200) ? 'success' : 'danger'

    this.toastController.create({
      message: message,
      duration: 2000,
      color: toastColor,
      closeButtonText: 'Cerrar',
      showCloseButton: true
    }).then(toast => {
      toast.present()
      if (statusCode === 200) {
        this.closeModal();
      }
    });
  }
}
