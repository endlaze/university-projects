import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EMAIL_REGEXP } from '../../const/regex.constants'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted: Boolean = false
  loading = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private guard: AuthGuard,
    private authService: AuthService

  ) { }

  ngOnInit() {
    if (this.guard.isUserLoggedIn()) {
      this.router.navigate(['/library']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(new RegExp(EMAIL_REGEXP))]],
      password: ['', [Validators.required]],
    });
  }

  get form() { return this.loginForm.controls }

  login = () => {
    let user = this.loginForm.getRawValue();
    this.submitted = true;
    if (this.loginForm.invalid) return
    this.loading = true;

    this.authService.login(user)
      .subscribe(res => this.authSuccess(res),
        err => this.authError(err));
  }

  authSuccess(res) {
    let user = res.user;
    this.loading = false;
    this.guard.setSession(res.token);
    // this.toastr.clear();
    this.storage.set('current-user', user);
    this.loading = false;
    console.log('Usuario autenticado', 'Acceso concedido');
    this.loginForm.reset()

    let routeToNavigate = (user.membership === null) ? '/plans' : '/movies-library';
    this.router.navigate([routeToNavigate]);

  }

  authError(err) {
    this.loading = false;
    console.log('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
    // this.toastr.error('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
  }
}
