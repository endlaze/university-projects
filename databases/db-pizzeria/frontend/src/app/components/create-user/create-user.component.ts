import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user-service/user.service'


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      id: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      repeatedEmail: ['', Validators.required]
    });
  }
  get form() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const user = {
      name: this.form.name.value,
      lastName: this.form.lastName.value,
      id: this.form.id.value,
      phoneNumber: this.form.phoneNumber.value,
      address: this.form.address.value,
      email: this.form.email.value,
      repeatedEmail: this.form.repeatedEmail.value
    }

    this.userService.registerUser(user).subscribe(res => console.log(res),
      err => console.log(err));

  }
  closeModal() {
    this.bsModalRef.hide();
  }

  validateEmail = () => ((this.form.email.value === this.form.repeatedEmail.value) && !this.registerForm.invalid)

}


