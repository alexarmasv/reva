import { HuespedService } from '../services/huesped.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public token: string;
  public myForm: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController, private router: Router, private huespedService: HuespedService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      token: "administrador"
    });
  }

  public login(data): void {
    this.token = data.token;
    if (this.token === "administrador") {
      this.presentToast('bottom', 'Bienvenido Admin');
      this.router.navigate(['/huesped']);
      return;
    }

    if (this.huespedService.getHuespedByToken(this.token)) {
      this.presentToast('bottom', 'Bienvenido');
      this.getHuespedByToken(this.token);
      this.huespedService.setToken(this.token);
      return
    }

    this.presentToast('bottom', 'No existe un huesped con ese token');

  }

  public getHuespedByToken(token: string): void {
    this.router.navigate(['/tabs/tab1']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000,
      position: position
    });

    await toast.present();
  }

}
