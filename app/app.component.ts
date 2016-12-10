import { Component } from '@angular/core';
import { Dorsal, Response, Report } from './app.dorsal';
import { Sensitive } from './app.private';
import { HelpersService} from './helpers.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/template.html',
  providers: [Dorsal, Sensitive],
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

  private reports: Array<any>;

  private scale: number = 24;

  private dummyData: Array<any> = [
    {value: 1},
    {value: 1},
    {value: 2},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 0},
    {value: 4},
    {value: 5},
    {value: 6},
    {value: 9},
    {value: 12},
    {value: 4},
    {value: 2},
    {value: 3},
    {value: 1},
    {value: 4},
    {value: 5},
    {value: 3},
    {value: 2},
    {value: 5},
    {value: 2}
  ];

  private helpers: HelpersService;

  constructor(dorsal: Dorsal, helpers: HelpersService) {
    this.sharks = ['bull', 'white', 'tiger'];
    this.dorsal = dorsal;
    this.helpers = helpers;
    dorsal.getStates().subscribe(
      response => {
        this.states = response.responseData;
      }
    )
  }

  keys(object: any) {
    return Object.keys(object);
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
  }

  onZoneSelect(zone: string) {
    this.selectedZone = zone;
    this.dorsal.getLocations('australia', this.selectedState, zone).subscribe(
      response => {
        this.locations = response.responseData;
        let body = {
          "approved": true,
          "state": this.selectedState,
          "zone": this.selectedZone,
          "country": "Australia",
          "typeOfShark": this.selectedShark,
          "timeRange":0,
          "pageIndex": 0,
          "pageSize": 10
        }
        this.dorsal.getSharks(body).subscribe(
          (response) => {
            this.reports = response.responseData;
            console.log(this.helpers.roundToNearestHour(this.reports[1].reportTime));
            console.log(response.responseData);
          }
        ) 
      } 
    )
  }

}
