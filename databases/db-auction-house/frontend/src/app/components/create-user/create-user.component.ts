import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { getRole, getRoute } from '../../const/role-constants'
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})

export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  currentRole;
  adminValidRoles = ['Administrador', 'Agente']
  selRole = "Administrador";

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.currentRole = getRole(this.storage.get('current-user').role);
    this.selRole = (this.currentRole.currentRole === 'Administrador') ? 'Administrador' : 'Participante'


    this.userForm = this.formBuilder.group({
      alias: ['', Validators.required],
      id: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      selectedUserRole: [''],
      numCredCard: [''],
      cvc: ['']
    });
  }

  get form() { return this.userForm.controls; }

  onSubmit() {
    const user = {
      Alias: this.form.alias.value,
      Cedula: this.form.id.value,
      NombreApellidos: this.form.fullName.value,
      Correo: this.form.email.value,
      Direccion: this.form.address.value,
      password: this.form.password.value,
      Telefono: this.form.phoneNumber.value,
      ConTarjeta: (this.form.numCredCard.value !== '' && this.form.cvc.value !== '')
    };

    if (!this.validateForm()) {
      return;
    }

    this.userService.createUser(user, getRoute(this.selRole))
      .subscribe((res) => {
        this.router.navigate(['/auctions']);

        console.log('El usuario ha sido creado correctamente', 'Usuario Registrado');
      },
        (err) => { console.log('El usuario ya existe', 'Usuario Registrado'); });
  }

  validateForm = () => (this.form.password.value === this.form.passwordConfirm.value) && !this.userForm.invalid
}
