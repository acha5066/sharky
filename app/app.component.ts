import { Component } from '@angular/core';
import { Dorsal, Response, Report } from './app.dorsal';
import { Sensitive } from './app.private';

@Component({
  selector: 'my-app',
  templateUrl: 'app/template.html',
  providers: [Dorsal, Sensitive],
  styles: [
    '.bar-graph__bar {flex-grow: 1; background-color: grey; color: white; margin: 0 5px;}',
    '.bar-graph__bar:hover {background-color: green}',
    '.bar-graph {align-items: flex-end; display: flex; justify-content: space-between; border-bottom: 1px solid black; border-left: 1px solid black; height: 500px}',
  ]
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

  private highestVal: number;

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

  constructor(dorsal: Dorsal) {
    this.sharks = ['bull', 'white', 'tiger'];
    this.dorsal = dorsal;
    dorsal.getStates().subscribe(
      response => {
        this.states = response.responseData;
      }
    )
    let values = this.getValueOfKeysFromArrayOfObjects(this.dummyData, 'value');
    this.highestVal = this.calculateHighest(values);
  }

  /**
   * calculate the percentage of a value compared to the highest
   * value. 
   */
  calculatePercentageHeight(value: number) {
    return (value / this.highestVal) * 100 + '%';
  }

  /**
   * Use this method when you want to create a new array of values from a specfic key of
   * an array of objects 
   */
  getValueOfKeysFromArrayOfObjects(arrayOfObjects: Array<any>, key: string):Array<any> {
    let values: Array<number> = [];
    values = arrayOfObjects.map((value, index) => {
      return value[key];
    });
    return values;
  }

  /**
   * Calculate the highest value in an array.
   */
  calculateHighest(values: Array<number>):number {
    return Math.max.apply(null, values);
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
            console.log(response.responseData);
          }
        ) 
      } 
    )
  }

}
