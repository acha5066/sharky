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
    {label: 'white', value: 1},
    {label: 'bull', value: 1},
    {label: 'tiger', value: 2},
    {label: 'hammer', value: 0},
    {label: 'wobby', value: 0}
  ];

  private helpers: HelpersService;

  private xAxisLabel: string = 'Sharks';
  
  private yAxisLabel: string = 'Sightings'; 

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
