import { HuespedService } from '../services/huesped.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public token: string;
  public myForm: FormGroup;
  private huespedes:Huesped[];

  constructor(private fb: FormBuilder, private toastController: ToastController, private router: Router, private huespedService: HuespedService) { 
    this.huespedService.getHuespeds().subscribe(res =>{
      this.huespedes = res;
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      token: "o462vqhuuze74vyrtxbou"
    });
  }

  public login(data): void {
    
    this.token = data.token;
    if (this.token === "adm") {
      this.presentToast('bottom', 'Bienvenido Admin');
      this.router.navigate(['/huesped']);
      return;
    }

    let huesped; 
    this.huespedes.forEach(h => {
        if(h.token === this.token){
          huesped = h;
        }
    });
    
    if (huesped!==undefined) {
      this.presentToast('bottom', 'Bienvenido');
      this.huespedService.crearHuesped(huesped);
      this.router.navigate(['/tabs/tab1']);
      return
    }

    this.presentToast('bottom', 'No existe un huesped con ese token');

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 500,
      position: position
    });

    await toast.present();
  }

}
