import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.css']
})
export class ApagarComponent implements OnInit {

   valor = [{id : 1, nome : "Felipe"},
    {id : 2, nome : "Carlos"},
    {id : 3, nome : "Rafael"} ]

  
  valor3 = [{ valor : true},
    { valor : true},
    { valor : false} ]
  

  constructor() { }

  ngOnInit(): void {
  }

  clicou(){
    
    const v = this.valor;
    const v2 = this.valor3;

    const v3 = Object.assign(v);
    v3.push(v2)

    console.log(v);
    console.log(v2);
    console.log(v3);


  }

}
