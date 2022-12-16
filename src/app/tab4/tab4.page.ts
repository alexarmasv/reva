import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {Camera, CameraResultType} from '@capacitor/camera';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {


  constructor(private huespedService:HuespedService) { 
  }

  ngOnInit() {
    
  }


}
