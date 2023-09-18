import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { BidService } from 'src/app/services/bid-service/bid.service';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.less']
})
export class ParamsComponent implements OnInit {
  paramsForm: FormGroup;
  currentUser;
  currentComission;
  currentMinPush;

  constructor(private bidsService: BidService, private formBuilder: FormBuilder, public bsModalRef: BsModalRef, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.paramsForm = this.formBuilder.group({
      minPush: ['', Validators.required],
      commission: ['', Validators.required]
    });

    this.currentUser = this.storage.get('current-user')

    this.bidsService.getParams(this.currentUser.role).subscribe((res: any) => {
      let params =res.pop()
      this.currentComission = params.Comision
      this.currentMinPush = params.AumentoMinimo
    }, () => console.log('No se pudo actualizar los parametros', 'Error'))
    this.bsModalRef.hide()


  }
  get form() { return this.paramsForm.controls; }

  onSubmit() {
    let params = { AumentoMinimo: this.currentMinPush, Comision: this.currentComission}
    console.log(params)
    this.bidsService.updateParams(params).subscribe(res => {
      console.log(res)
    }, () => console.log('No se pudo actualizar los parametros', 'Error'))
    this.bsModalRef.hide()
  }
}
