import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  price: number = 0;
  quantity: number = 1;
  totalAmount: number = 0;
}
