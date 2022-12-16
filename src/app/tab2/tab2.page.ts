import { Component } from '@angular/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public huesped:Huesped;
  public token:string;

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {
    this.huesped = {
      name: "",
      phone: "",
      checkin: "",
      checkout: "",
      room: "",
      token: "",
    };    
    this.huesped = huespedService.getHuesped();
  }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params)=>{
        this.token = params['token'];
        this.huespedService.getHuesped();

      }
    );

  }

  public enFecha(llegada:String, salida:String):Boolean{
    let fecha = new Date;
    console.log(llegada, salida, fecha);
    
    return (llegada <= fecha.toISOString() && salida >= fecha.toISOString());
  }

}
