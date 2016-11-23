import { Component } from '@angular/core';
import { Dorsal, Response, Report } from './app.dorsal';

@Component({
  selector: 'my-app',
  templateUrl: 'app/template.html',
  providers: [Dorsal]
})
export class AppComponent  { 

  private name: string;

  private sharks: Array<string>;

  private states: Array<string>;

  private selectedShark: string;

  private dorsal: Dorsal;

  private selectedState: string;

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
    this.getReports(state);
  }

}
