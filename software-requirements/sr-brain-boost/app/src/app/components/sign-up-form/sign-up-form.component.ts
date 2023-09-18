import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StockRolesService } from '../../services/stock-roles/stock-roles.service';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})

export class SignUpFormComponent implements OnInit {

  private signUpForm: FormGroup;
  customMonthNames = "Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Set, Oct, Nov, Dic"
  datePickerOptions: any;
  userRoleSelectOptions: any
  userRoles = [{ role_id: 1, role_desc: "Paciente" }]
  userSubroles = []
  selectedSubroles = []
  selectedDate;

  constructor(private formBuilder: FormBuilder, private stockRolesService: StockRolesService, private userService: UserService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      id: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
      name: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
      first_last_name: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
      second_last_name: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
      email: ['', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      user_role: [1, Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8,8}'), Validators.minLength(8), Validators.minLength(8)]]
    });

    this.datePickerOptions = { buttons: [{ text: 'Guardar' }] }
    this.userRoleSelectOptions = { header: 'Tipo de usuario', translucent: true }

    this.getStockRoles()
  }

  ngOnInit() { }

  get form() { return this.signUpForm.controls; }

  onRoleChange(role) {
    this.updateselectedSubroles(role.detail.value)
  }

  onDateChange(date) {
    this.selectedDate = date.detail.value
  }

  onSubRoleChange = (subrole) => {
    subrole = parseInt(subrole)

    if (this.form.user_role.value === '3') {
      this.selectedSubroles.forEach((ele) => {
        ele.checked = false
      })
    }
  }

  getStockRoles = () => {
    this.stockRolesService.getStockRolesXSubroles().subscribe((res: any) => {
      this.formatRS(res.result)
    })
  }

  updateselectedSubroles(role_id) {
    role_id = parseInt(role_id)
    this.selectedSubroles = []

    this.userSubroles.forEach(subrole => {
      if (role_id === subrole.role_id) {
        this.selectedSubroles.push(subrole)
      }
    })
  }

  createUser = () => {
    if (this.form.password.value !== this.form.passwordConfirm.value) {
      return
    }

    let userData = this.signUpForm.getRawValue()
    let userRoles = this.selectedSubroles.filter(({ checked }) => checked);

    userData['user_subroles'] = userRoles
    userData['birthday'] = this.selectedDate
    delete userData.passwordConfirm

    this.userService.create(userData).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }

  formatRS = (rs) => {
    console.log(rs)
    let seen = []
    this.userRoles = []

    rs.forEach(element => {
      let { role_id, role_desc, subrole_id, subrole_desc } = element
      if (!(seen.includes(role_id))) {
        seen.push(role_id)
        this.userRoles.push({ role_id, role_desc })
      }
      if (subrole_id) {
        this.userSubroles.push({ role_id, subrole_id, subrole_desc, checked: false })
      }
    });
  }

  checkId = (id) => {
    id = id.detail.value
    if (id.length === 9) {
      this.getUserInformation(id)
    }
  }

  getUserInformation = (id) => {
    this.userService.getNames({ id: id }).subscribe((res: any) => {
      let { name, first_last_name, second_last_name } = res
      this.signUpForm.patchValue({ name: name, first_last_name: first_last_name, second_last_name: second_last_name })
    })
  }

}
