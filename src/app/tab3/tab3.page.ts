import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fotos:any[]=[]
  constructor() {
    this.fotos.push('https://mediaim.expedia.com/destination/1/0c17f4261f065313a5d5260d0f77fd04.jpg')
    this.fotos.push('https://mediaim.expedia.com/destination/2/d51ccba0bcbb9ca1084b8e81baa945bc.jpg')
    this.fotos.push('https://www.corazondenayarit.com/wp-content/uploads/2019/10/laguna-santa-maria-del-oro-nayarit-ecoturismo8.jpg')
    this.fotos.push('https://www.eloccidental.com.mx/incoming/cym10b-santa-maria-del-oro.jpeg/ALTERNATES/LANDSCAPE_400/Santa%20Mari%CC%81a%20del%20Oro.jpeg')
    this.fotos.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHBjE7PRMI77V2OEi6R-5YVXaMr5KncwaBA&usqp=CAU')
    
  }

}
