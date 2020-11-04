import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pin = {
    latitude : "",
    longitude : "",
    name : "",
    description : ""
  }

  constructor(private http : HttpClient) {}

  // Send the new pin to the server
  validateForm() {
    this.http.post("http://localhost:3000/addPin", this.pin)
      .subscribe(data => {
        console.log(data);
      });
  }

}
