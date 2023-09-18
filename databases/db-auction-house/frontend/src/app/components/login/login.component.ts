import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from '../../guard/auth-guard';
import { AuthService } from '../../services/auth-service/auth.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private guard: AuthGuard,
    private authService: AuthService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      alias: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    const user = { alias: this.form.alias.value, password: this.form.password.value };
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(user)
      .subscribe(res => this.authSuccess(res), err => this.authError(err));
  }

  authSuccess(res) {
    if (res.user && res.user != undefined && !res.user.suspendido) {
      this.guard.setSession(res.token);
      this.storage.set('current-user', res.user)
      this.router.navigate(['/auctions']);
    }

    if (res.user.suspendido) {
      this.toastr.error('Usuario suspendido')
    }
  }

  authError(err) {
    this.loading = false;
    this.toastr.error(err.error.reason)
    console.log(err.status, err.error.reason);
  }
}