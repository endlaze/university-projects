import { Component, OnInit, Inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DefinePizzaComponent } from '../../components/define-pizza/define-pizza.component'

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  newRegisterRef: BsModalRef

  constructor(private modalService: BsModalService, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
  }


  showCreatePizzaModal() {
    this.newRegisterRef = this.modalService.show(DefinePizzaComponent);
    this.modalService.onHide.subscribe(() => { console.log('error') });
  }

}
