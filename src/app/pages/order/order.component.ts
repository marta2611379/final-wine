import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: IOrder;
  name: string = 'marta';
  surname: string = 'martsinkiv';
  tel: string = '';
  disabledAdd: boolean = true;
  sum:number=0;

  constructor(private wineService: WineService,
    private firestore: AngularFirestore) {
    this.orders = wineService.orders;
    console.log(this.orders);

  }
  ngOnInit() {
  }
  public phonenumber(): boolean {
    let phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (this.tel.match(phoneno)) {
      console.log('+');

      return true;
    }
    else {
      console.log('-');
      return false;
    }
  }

  public disabledStatusAdd(): boolean {
    if ((this.name == '' || undefined) || (this.surname == '' || undefined) || (this.tel == '' || undefined) || (this.phonenumber() == false)) {
      this.disabledAdd = true;
    } else {
      this.disabledAdd = false;
    }
    return this.disabledAdd;
  }
  public increment(wine): void {
    if (wine.counter != 1) {
      wine.counter--;
    }
    localStorage.setItem('order', JSON.stringify(this.wineService.orders));
  }

  public decrement(wine): void {
    wine.counter++;
    localStorage.setItem('order', JSON.stringify(this.wineService.orders));
  }

  public summ(wine):number{
  this.sum= wine.counter*wine.price;
  return this.sum;
  }
  public delete(i): void {
    this.wineService.orders.wines.splice(i, 1);
    localStorage.setItem('order', JSON.stringify(this.wineService.orders));
  }

  public addOrder(): void {
    if (this.phonenumber() == true) {
      this.firestore.collection('orders').add({
        name: this.name,
        surname: this.surname,
        tel: this.tel,
        order: this.orders,
        status: false
      }).then(function () {
        console.log("Document successfully add!");
      }).catch(function (error) {
        console.error("Error adding document: ", error);
      });
    } else {

    }

    this.wineService.orders = {
      id: '',
      wines: []
    }

    this.orders = {
      id: '',
      wines: []
    }

    localStorage.removeItem('order');
  }

}
