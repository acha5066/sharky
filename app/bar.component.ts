import { Component, Input} from '@angular/core';
import { MathService } from './math.service';
import { HelpersService } from './helpers.service';

@Component({
  selector: 'bar',
  templateUrl: 'app/bar.html',
  styles: [
    ':host {display: block; padding: 50px}',
    '.bar-graph__bar {flex-grow: 1; background-color: grey; color: white; margin: 0 5px;}',
    '.bar-graph__bar:hover {background-color: green}',
    '.bar-graph {align-items: flex-end; display: flex; justify-content: space-between; border-bottom: 1px solid black; border-left: 1px solid black; height: 500px; position: relative;}',
    '.axis {position: absolute}',
    '.axis__x {left: 50%; transform: translateX(-50%); bottom: -50px}',
    '.axis__y {top: 50%; transform: translateY(-50%) rotate(-90deg); left: -50px;}'
  ]
})
export class Bar {

  private highestVal: number;

  private math: MathService;

  private helpers: HelpersService;

  @Input() dummyData: any;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;

  constructor(math: MathService, helpers: HelpersService) {
    this.math = math;
    this.helpers = helpers;
  }

  ngOnInit() {
    let values = this.helpers.getValueOfKeysFromArrayOfObjects(this.dummyData, 'value');
    this.highestVal = this.math.calculateHighest(values); 
  }

}

