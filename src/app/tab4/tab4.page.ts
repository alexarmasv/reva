import { Component, OnInit } from '@angular/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public code = ''
  list:string[] = []
  public huesped:Huesped;
  constructor(public translate : TranslateService,private huespedService:HuespedService) {
    this.code = (Math.floor(Math.random() * 9) + 1)+""+(Math.floor(Math.random() * 9) + 1)+""+(Math.floor(Math.random() * 9) + 1)+""+(Math.floor(Math.random() * 9) + 1)+"" ; 
    this.list.push('https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png')
    this.list.push('https://static-assets.bamgrid.com/product/disneyplus/images/share-default.14fadd993578b9916f855cebafb71e62.png')
    this.list.push('https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/2560px-Netflix_logo.svg.png')
  }

  ngOnInit() {
    this.huesped = this.huespedService.getHuesped();
  }



}
