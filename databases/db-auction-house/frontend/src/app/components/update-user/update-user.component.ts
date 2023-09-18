import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { getRole } from '../../const/role-constants'
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateTarjetaComponent } from '../update-tarjeta/update-tarjeta.component'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.less']
})

export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  creditCardModal: BsModalRef
  currentRole;
  userToUpdate;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.currentRole = getRole(this.storage.get('current-user').role);
    this.userToUpdate = this.storage.get('user-to-update')
    this.userForm = this.formBuilder.group({
      alias: [this.userToUpdate.Alias, Validators.required],
      fullName: [this.userToUpdate.NombreApellidos, Validators.required],
      password: [''],
      passwordConfirm: [''],
      phoneNumber: this.userToUpdate.Telefono,
      address: [this.userToUpdate.Direccion, Validators.required],
      email: [this.userToUpdate.Correo, Validators.required],
    });

    this.userForm.patchValue({
      alias: this.userToUpdate.Alias,
      fullName: this.userToUpdate.NombreApellidos,
      address: this.userToUpdate.Direccion,
      email: this.userToUpdate.Correo,
      phoneNumber: this.userToUpdate.Telefono
    })
  }

  get form() { return this.userForm.controls; }

  onSubmit() {
    const user = {
      NuevoAlias: this.form.alias.value,
      Alias: this.userToUpdate.Alias,
      NombreApellidos: this.form.fullName.value,
      Correo: this.form.email.value,
      Telefono: this.form.phoneNumber.value,
      Direccion: this.form.address.value,
      password: this.form.password.value,
      Rol: this.currentRole.currentRole
    };

    if (!this.validatePassword()) {
      this.toastr.error('Las contraseñas no son iguales')
      return
    }

    this.userService.updateUser(user, this.currentRole.route)
      .subscribe((res) => {
        this.router.navigate(['/auctions']);
      },
        (err) => { console.log(err); });
  }

  showCreditModal() {
    this.creditCardModal = this.modalService.show(UpdateTarjetaComponent);
    this.modalService.onHide.subscribe(() => {
    });
  }

  validatePassword = () => (this.form.password.value === this.form.passwordConfirm.value)
}
