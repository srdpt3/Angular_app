import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedCurrency: string = "KRW";
  title = 'cryptoPriceTracker';

  constructor() {

  }

  sendCurrency(event: string) {
    console.log(event);

  }
}
