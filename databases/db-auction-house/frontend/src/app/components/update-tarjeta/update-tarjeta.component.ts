import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { UserService } from '../../services/user-service/user.service'

@Component({
  selector: 'app-update-tarjeta',
  templateUrl: './update-tarjeta.component.html',
  styleUrls: ['./update-tarjeta.component.less']
})
export class UpdateTarjetaComponent implements OnInit {
  cardForm: FormGroup;
  user;
  constructor(private userService: UserService, private formBuilder: FormBuilder, public bsModalRef: BsModalRef, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.user = this.storage.get('user-to-update')
    this.cardForm = this.formBuilder.group({
      numCredCard: [''],
      cvc: ['']
    });
  }

  get form() { return this.cardForm.controls; }

  onSubmit() {
    let user = { Alias: this.storage.get('user-to-update').Alias, NuevoRegistro: true }


    this.userService.updatePartCard(user).subscribe(users => {

      console.log(users)
    }, () => console.log('No se pudo recuperar los usuarios de la base de datos', 'Error'))

  }
}
