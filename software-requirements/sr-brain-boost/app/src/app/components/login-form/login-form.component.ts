import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EMAIL_REGEXP, CR_ID_REGEXP } from '../../../const/regexp.constants';
import { AuthService } from '../../services/auth-service/auth.service'
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthGuard } from '../../guard/auth-guard'
import { UserService } from '../../services/user-service/user.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;
  emailRegExp = new RegExp(EMAIL_REGEXP);
  idRegExp = new RegExp(CR_ID_REGEXP);

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController,
    private guard: AuthGuard,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() { return this.loginForm.controls }

  isFormValid = () => {
    let currentUsername = this.form.username.value;
    return this.loginForm.valid && (this.idRegExp.test(currentUsername) || this.emailRegExp.test(currentUsername));
  }

  login = () => {
    let user = this.loginForm.getRawValue();
    user['username_type'] = (this.idRegExp.test(this.form.username.value)) ? 0 : 1;
    this.authService.login(user).subscribe((res: any) => this.authHandler(res.response), err => this.authErr(err));
  }

  authHandler = (res) => {
    if (res.status === 200) {
      this.guard.setSession(res.token);
      this.storage.set('current-user-id', res.user.user_id);
      this.getUserRoles(res.user.user_id);
      this.storage.set('reminder-count', 1)
      this.storage.set('reminders', [{
        rem_id: 1,
        rem_title: 'Regar el jardín',
        rem_desc: 'Debe regar todas las plantas del jardín',
        rem_date: "2021-10-17T21:59:51.551-06:00",
        rem_time: "2019-10-17T00:30:51.552-06:00"
      }]);
      this.router.navigate(['/home']);
    }
    this.toastHandler(res.status, res.message);
  }

  authErr = (err) => {
    console.log(err)
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
    });
  }

  ngOnInit() { }

  getUserRoles = (id) => {
    this.userService.getRoles({ user_id: id }).subscribe((res: any) => {
      this.storage.set('user_roles', res.response);
    }, err => { console.log(err) });
  }
}
