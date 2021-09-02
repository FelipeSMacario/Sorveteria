import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()title : string;
  @Input()msg : string;
  @Input()txtOk : string;
  @Input()txtCancel : string;

  constructor(
    
  ) { }

  ngOnInit(): void {
  }

  onConfirm(){

  }

  onClose(){

  }

  modalChoose(value : boolean){

  }

}
