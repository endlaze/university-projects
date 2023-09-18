import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { LocalService } from 'src/app/services/local-service/local.service';


@Component({
  selector: 'app-registrar-local',
  templateUrl: './registrar-local.component.html',
  styleUrls: ['./registrar-local.component.less']
})
export class RegistrarLocalComponent implements OnInit {
    localForm: FormGroup;
    createUser: any;
    registerModalRef: BsModalRef;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private localService: LocalService
    ) { }

  ngOnInit() {
    this.localForm = this.formBuilder.group({
      address: ['', Validators.required],
      openHours: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  get form() { return this.localForm.controls; }

  onSubmit() {
    if (this.localForm.invalid) {
      return;
    }
    const local = {
      Nombre: this.form.name.value,
      Horario: this.form.openHours.value,
      Telefono: this.form.phoneNumber.value,
      Direccion: this.form.address.value,
    }

    this.localService.registerLocal(local).subscribe(res => {this.closeModal();console.log(res)},
      err => console.log(err));

  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
