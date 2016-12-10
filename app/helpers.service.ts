import {Injectable} from '@angular/core';

@Injectable()
export class HelpersService {

  roundToNearestHour(timestamp: number):number {
    let date = new Date(timestamp);
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0);
    return date.getHours();
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

}