import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactService } from '../../services/contact-service/contact.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})

export class ContactComponent implements OnInit {
  contactForm: FormGroup
  submitted: Boolean = false

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    })
  }

  get form() { return this.contactForm.controls; }

  onSubmit = () => {
    this.submitted = true
    const messageInfo = {
      name: this.form.name.value,
      email: this.form.email.value,
      message: this.form.message.value
    }

    if (this.contactForm.invalid) return

    this.contactService.sendMail(messageInfo).subscribe(res => {
      console.log(res.status)
      console.log(res.body)
    })

    this.contactForm.reset()
    this.submitted = false
  }
}
