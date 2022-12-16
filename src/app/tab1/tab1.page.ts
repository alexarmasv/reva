import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  langs:string[] = [];
  huesped: Huesped;
  public fecha: Date;
  photos1 = []
  photos2 = []
  photos3 = []

  constructor(public translate : TranslateService, huespedService: HuespedService) {
   this.fecha = new Date;
   this.huesped = huespedService.getHuesped();
   console.log(this.huesped);
   this.photos1.push('https://scontent.ftpq1-1.fna.fbcdn.net/v/t39.30808-6/290691941_128992559816955_3672095065837549650_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE69ugrrnaMiIAvUq90BS1xdMBXdvPFtql0wFd288W2qdVn27vkvM_1bUm8ySGuOEZYOjXllM3RmhxtrVv0RtwI&_nc_ohc=DzvViGcdx54AX9G4diw&_nc_ht=scontent.ftpq1-1.fna&oh=00_AfC9Wpbp2k-xtsA27nUBdO2IW7JE1bNnh8jPTcOIpVwF8A&oe=63A0F779')
   this.photos1.push('https://cdn1.yumping.com.mx/emp/fotos/4/3/6/0/3/tm_p-43603-dsc06717_14684349413412.jpg')
   this.photos2.push('https://mejorconsalud.as.com/wp-content/uploads/2017/03/Recibir-masajes.jpg')
   this.photos2.push('https://www.elsoldetoluca.com.mx/incoming/9x1gfj-temazcal-img-20210430-wa0011.jpg/ALTERNATES/LANDSCAPE_1140/Temazcal%20IMG-20210430-WA0011.jpg')
   this.photos3.push('https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2013/06/18/1331597135605_2/en-bici-por-valle-de-la-muerte')
   this.photos3.push('https://estaticos.muyinteresante.es/uploads/images/gallery/5f2a75795cafe8053b39bcfc/senderismo-redes.jpg')
  }

}
