import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private token: string;
  private huespeds: Huesped[];
  private today: any;
  private huesped:Huesped;

  constructor(private firestore: AngularFirestore) {
    this.huespeds = [
      {
        checkin: "2022-12-16T08:35:00-07:00",
        checkout: "2022-12-18T08:35:00-07:00",
        name: "Alejandro",
        phone: "3112100310",
        room: "León",
        token: "6eszwk367fjqe8gd5w4728"
      }];
    }

  public getHuespeds(): Observable<Huesped[]> {
    return this.firestore.collection('huespedes').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public crearHuesped(huesped:Huesped){
    this.huesped = huesped;
  }


  public getHuesped():Huesped{
    return this.huesped;
  }

  public getHuespedByRoom(rm: string) {
    let result = this.firestore.collection('huespedes', ref => ref.where('room', '==', rm)).valueChanges();
    return result;
  }

  public getFechasByRoom(rm: string): Observable<Huesped[]> {
    return this.firestore.collection('huespedes', ref => ref.where('room', '==', rm)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public newHuesped(huesped: Huesped): void {
    this.firestore.collection('huespedes').doc(huesped.token).set(huesped);
  }

  public removeHuesped(id: string): void {
    this.firestore.collection('huespedes').doc(id).delete();
  }

}
