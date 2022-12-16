import { Component, OnInit } from '@angular/core';
import { Huesped } from 'src/app/models/huesped';
import { HuespedService } from '../services/huesped.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {

  public huesped: Huesped;
  public huespeds: Huesped[];

  public rooms: any[] = [];

  public myForm: FormGroup;
  public validatorMessages: Object;

  public checkin: any;
  constructor(private huespedService: HuespedService, private fb: FormBuilder, private router: Router, private toastController: ToastController) {
    this.rooms.push('León');
    this.rooms.push('Elefante');
    this.huespedService.getHuespeds().subscribe(res => {
      this.huespeds = res;
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      checkin: ["", Validators.required],
      checkout: ["", Validators.required],
      room: ["León", Validators.required]
    });
    this.validatorMessages = {
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      phone: [
        { type: 'required', message: "Teléfono obligatorio" },
        { type: 'minlength', message: "El Teléfono debe ser de mínimo 11 digitos" },
        { type: 'maxlength', message: "El Teléfono debe ser de máximo 12 digitos" },
        { type: 'pattern', message: "El Teléfono debe ser de 10 dígitos. Ej. 3113331111" }
      ],
      checkin: [
        { type: 'required', message: "Fecha de entrada obligatoria" }
      ],
      checkout: [
        { type: 'required', message: "Fecha de salida obligatoria" }
      ],
      room: [
        { type: 'required', message: "Cuarto obligatorio" }
      ]
    }

    this.myForm.get('checkin').valueChanges.subscribe(selectedValue => {
      let newDay = new Date(selectedValue);
      newDay.setDate(newDay.getDate() + 1)
      this.checkin = newDay.getFullYear() + '-' + ('0' + (newDay.getMonth() + 1)).slice(-2) + '-' + ('0' + (newDay.getDate())).slice(-2);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Huesped agregado',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async reservada() {
    const toast = await this.toastController.create({
      message: 'La habitación ya está reservada en esas fechas',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  public newHuesped(data) {
    if (this.checkRoom(data['room'], data['checkin'])) {
      data.token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
      this.huesped = data;
      this.huespedService.newHuesped(this.huesped);
      this.presentToast();
      this.router.navigate(['/huesped']);

    } else {
      this.reservada();
    }
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  public checkRoom(room, checkin) {

    const date = this.formatDate(new Date(checkin));

    let flag = true;

    this.huespeds.forEach(element => {
      const hdate = this.formatDate(new Date(element.checkin));
      if (hdate === date && room === element.room) {
        flag = false;
      }

    });

    return flag;

    // if(this.huespedService.getHuespedByRoom(room)){

    //   this.huespedService.getFechasByRoom(room).subscribe(res =>{
    //     this.huespedsDates = res;

    //   })
    //   let item = true;

    // this.huespedsDates.forEach(
    //   (huesped) => {
    //     if(huesped.checkout.substring(0,10) >= checkin.substring(0,10)){

    //       item = false;
    //     }
    //   });

    //   if(!item){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else{
    //   return true;
    // }
  }



}
