import { Component, NgZone, OnInit, Inject } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// MatIconModule

@Component({
  selector: 'app-google-maps-modal',
  templateUrl: './google-maps-modal.component.html',
  styleUrls: ['./google-maps-modal.component.scss'],
})
// extends BaseModalComponent
// implements OnInit
export class GoogleMapsModalComponent {
  // latitude: number;
  // longitude: number;
  // zoom: number;
  // address: string;
  // private geoCoder;
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data,
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone,
  //   private translate: TranslateService,
  //   public dialogRef: MatDialogRef<GoogleMapsModalComponent>,
  // ) {
  //   super(translate, dialogRef);
  // }
  // ngOnInit() {
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     this.geoCoder = new google.maps['Geocoder']();
  //     const center = { lat: 50.064192, lng: -130.605469 };
  //     // // Create a bounding box with sides ~10km away from the center point
  //     const defaultBounds = {
  //       north: center.lat + 0.1,
  //       south: center.lat - 0.1,
  //       east: center.lng + 0.1,
  //       west: center.lng - 0.1,
  //     };
  //     const input = document.getElementById('pac-input') as HTMLInputElement;
  //     const options = {
  //       bounds: defaultBounds,
  //       // componentRestrictions: { country: 'Ukraine' },
  //       types: ['(cities)'],
  //       fields: ['formatted_address', 'geometry', 'icon', 'name'],
  //       strictBounds: false,
  //     };
  //     let autocomplete = new google.maps.places.Autocomplete(input, options);
  //     autocomplete.addListener('place_changed', () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         console.log(autocomplete.getPlace());
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //         this.address = place.formatted_address;
  //       });
  //     });
  //   });
  // }
  // // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     console.log(navigator);
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log(position);
  //         this.latitude = this.data?.latitude || position.coords.latitude;
  //         this.longitude = this.data?.latitude || position.coords.longitude;
  //         this.zoom = 8;
  //         this.getAddress(this.latitude, this.longitude);
  //       },
  //       (err) => {
  //         this.latitude = 49.7842896;
  //         this.longitude = 24.029717;
  //         this.zoom = 8;
  //         this.getAddress(this.latitude, this.longitude);
  //       },
  //     );
  //   }
  // }
  // markerDragEnd($event: any) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }
  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode(
  //     { location: { lat: latitude, lng: longitude } },
  //     (results, status) => {
  //       console.log(results);
  //       console.log(status);
  //       if (status === 'OK') {
  //         if (results[0]) {
  //           this.zoom = 12;
  //           this.address = results[0].formatted_address;
  //         } else {
  //           window.alert('No results found');
  //         }
  //       } else {
  //         window.alert('Geocoder failed due to: ' + status);
  //       }
  //     },
  //   );
  // }
  // closeModal(sendData?) {
  //   if (sendData) {
  //     const data = {
  //       address: this.address,
  //       latitude: this.latitude,
  //       longitude: this.longitude,
  //     };
  //     this.onClose(data);
  //   }
  // }
}
