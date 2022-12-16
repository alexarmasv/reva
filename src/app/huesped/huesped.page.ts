import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-huesped',
  templateUrl: './huesped.page.html',
  styleUrls: ['./huesped.page.scss'],
})
export class HuespedPage implements OnInit {


  handlerMessage = '';
  roleMessage = '';
  public myForm: FormGroup;
  public message: string;
  public huespeds: Huesped[];
  public huespedsAux: Huesped[];
  public huesped: Huesped;

  constructor(private huespedService: HuespedService, private alertController: AlertController, private router: Router, private fb: FormBuilder) {
    this.huespedService.getHuespeds().subscribe(res => {
      this.huespeds = res;
      this.huespedsAux = this.huespeds;
      this.huespeds.sort((a, b) => (a.checkin > b.checkin) ? 1 : -1)
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      filter: [""]
    });
    this.myForm.get('filter').valueChanges.subscribe(selectedValue => {
      switch (selectedValue) {
        case 'all':
          this.todos();
          break;
        case 'fecha':
          this.porFecha();
          break;
        case 'leon':
          this.porLeon();
          break;
        case 'elefante':
          this.porElefante();
          break;
      }
    });
  }

  async removeHuesped(id: string) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Eliminación canceleda';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.huespedService.removeHuesped(id);
            this.handlerMessage = 'Eliminado';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  public newHuesped(): void {
    this.router.navigate(['/new-huesped']);
  }

  public todos(): void {
    this.huespedService.getHuespeds().subscribe(res => {
      this.huespeds = res;
    })

  }

  public porFecha(): void {
    let fecha = new Date;
    let hs:Huesped[] = []
    this.huespedsAux.forEach(h=>{
      console.log(h.checkin);
      
      if(h.checkin >=fecha.toISOString()){
        hs.push(h);
      }
    });
    this.huespeds = hs;
  }

  public porLeon(): void {
    let hs:Huesped[] = []
    this.huespedsAux.forEach(h=>{
      if(h.room === 'León'){
        hs.push(h);
      }
    });
    this.huespeds = hs;
  }

  public porElefante(): void {
    let hs:Huesped[] = []
    this.huespedsAux.forEach(h=>{
      if(h.room === 'Elefante'){
        hs.push(h);
      }
    });
    this.huespeds = hs;

  }
  public enviarToken(token: string, tel: string): void {
    const url = "https://api.whatsapp.com/send?phone=52" + tel + "&text=" +
      "Tu token es: " + token;
    window.open(url, '_system', 'location=yes');
  }
  public enviarLink(token: string, tel: string): void {
    const url = "https://api.whatsapp.com/send?phone=52" + tel + "&text=" +
      "Gracias por tu reservación. Ingresa a https://ubiquitous-salamander-d1c528.netlify.app/. Tu token es: " + token;
    window.open(url, '_system', 'location=yes');
  }

}
