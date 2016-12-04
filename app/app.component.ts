import { Component } from '@angular/core';
import { Dorsal, Response, Report } from './app.dorsal';
import { Sensitive } from './app.private';

@Component({
  selector: 'my-app',
  templateUrl: 'app/template.html',
  providers: [Dorsal, Sensitive]
})
export class AppComponent  { 

  private name: string;

  private sharks: Array<string>;

  private states: Array<string>;

  private selectedShark: string;

  private dorsal: Dorsal;

  private selectedState: string;

  private zones: Array<string>;

  private selectedZone: string;

  private locations: Array<string>;

  constructor(dorsal: Dorsal) {
    this.sharks = ['bull', 'white', 'tiger'];
    this.dorsal = dorsal;
    dorsal.getStates().subscribe(
      response => {
        this.states = response.responseData;
      }
    )
  }

  getReports(selectedState: string) {
    this.dorsal.getSharks(selectedState).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  onSharkSelect(shark: string) {
    this.selectedShark = shark;
  }

  onStateSelect(state: string) {
    this.selectedState = state;
    this.dorsal.getZones('australia', state).subscribe(
      response => {
        this.zones = response.responseData;
      }
    )
    this.getReports(state);
  }

  onZoneSelect(zone: string) {
    this.selectedZone = zone;
    this.dorsal.getLocations('australia', this.selectedState, zone).subscribe(
      response => {
        this.locations = response.responseData; 
        console.log(this.locations);
      } 
    )
  }

}
