import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  createUser: any;
  registerModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private modalService: BsModalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.loginService.login({ email: this.form.username.value })
      .subscribe(user => this.authSuccess(user),
        err => this.authError(err));
  }

  authSuccess(user) {
    if (user) {
      console.log(user)
      this.storage.set('currentUser', user);
      this.router.navigate(['/newOrder']);
    }
  }
  authError(err) {
    console.log('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
  }

  showRegisterPage() {
    this.registerModalRef = this.modalService.show(CreateUserComponent);
    this.modalService.onHide.subscribe(() => {
      console.log('hidden')
    });
  }
}
