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
  public huesped: Huesped;

  constructor(private huespedService: HuespedService,private alertController: AlertController,private router: Router, private fb:FormBuilder) {
    this.message = 'Gracias por tu reservación, para ver más detalles ingresa a <<link>>. Tu token es:'
    this.huespeds = huespedService.obtenerHuespedes();
   }

  ngOnInit() {
    this.myForm = this.fb.group({
      filter:[""]
    });

    console.log(this.myForm.get('filter'));

    this.myForm.get('filter').valueChanges.subscribe(selectedValue =>{
      switch(selectedValue){
        case 'all': this.filterByAll()

        ; break;
        case 'fecha': this.filterByDateAdmission(); break;
        case 'leon': this.filterByLionRoom(); break;
        case 'elefante': this.filterByElephantRoom(); break;
      }
    });
  }

  async removeHuesped(id:string) {
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

  public newHuesped():void{
    this.router.navigate(['/new-huesped']);
  }

  public filterByAll():void{
    this.huespedService.getHuespeds().subscribe(res =>{
      this.huespeds = res;
      console.log(res);
      
    })

  }

  public filterByDateAdmission():void{
    this.huespedService.filterByDateAdmission().subscribe(res =>{
      this.huespeds = res;
      console.log(this.huespeds);
    })

  }

  public filterByLionRoom():void{
    this.huespedService.filterByLionRoom().subscribe(res =>{
      this.huespeds = res;
      
    })

  }

  public filterByElephantRoom():void{
    this.huespedService.filterByElephantRoom().subscribe(res =>{
      this.huespeds = res;
      
    })

  }

  public enviarToken(token: string, tel: string): void {
 
    const url = "https://api.whatsapp.com/send?phone=52" + tel + "&text="+
    "Gracias por tu reservación, para ver más detalles ingresa a https://61p8fq8j4z.appflowapp.com/login - Tu token es:" + token;
    window.open(url, '_system', 'location=yes');
  }

}
