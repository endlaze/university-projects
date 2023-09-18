import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParamsComponent } from '../params/params.component'

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.less']
})
export class AppNavComponent implements OnInit {
  currentUser;
  currentRoute;
  paramsModal: BsModalRef

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currentUser = this.storage.get('current-user');
    this.currentRoute = this.storage.get('current-route');
  }

  showParamsModal() {
    this.paramsModal = this.modalService.show(ParamsComponent);
    this.modalService.onHide.subscribe(() => {
    });
  }
}
