import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService : BsModalService,
    private modal : ModalComponent
  ) { }

  showConfirm(title : string, msg : string, txtOk? : string, txtCancel? : string){
    const bsModalRef : BsModalRef = this.modalService.show(ModalComponent);

    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if(txtOk)
    bsModalRef.content.txtOk = txtOk;

    if(txtCancel)
    bsModalRef.content.txtCancel = txtCancel;

    return (<ModalComponent>bsModalRef.content).confirmResult;
  }
}
