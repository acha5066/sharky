import {Injectable} from '@angular/core';

@Injectable()
export class MathService {

   /**
   * calculate the percentage of a value compared to the highest
   * value. 
   */
  calculatePercentageHeight(value: number, highestVal: number):string {
    return (value / highestVal) * 100 + '%';
  }
 
  /**
   * Calculate the highest value in an array.
   */
  calculateHighest(values: Array<number>):number {
    return Math.max.apply(null, values);
  }


}