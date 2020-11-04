
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx"
import { HttpClient } from '@angular/common/http';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private display = false;
  private current_pin;

  @ViewChild('map', null) mapElement: ElementRef;
  map: any;

  constructor(public geolocation: Geolocation, private http: HttpClient) {
  }

  ngOnInit() {
    this.loadMap();
  }

  // Load the map
  loadMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.http.get("http://localhost:3000/getPins")
        .subscribe(data => {
          for (let point of JSON.parse(JSON.stringify(data))) {
            this.addMarker(point.latitude, point.longitude, point);
          }
        })
    }, (err) => {
      console.log(err);
    });
  }

  // Add marker retrieved from the API
  addMarker(latitude, longitude, object) {
    var myLatLng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: myLatLng,
      pin: object
    });
    this.addInfoWindow(marker);
  }

  // Add info window to each 
  addInfoWindow(marker) {
    google.maps.event.addListener(marker, 'click', () => {
      this.display = !this.display
      this.current_pin = marker.pin
      console.log(this.current_pin)
    });
  }

}
