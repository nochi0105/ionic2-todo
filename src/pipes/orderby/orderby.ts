import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderbyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'orderby',
})
export class OrderbyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(array: Array<object>, key: string, ...args): Array<object> {
    args[0] = args[0] || '';
    switch (args[0].toLowerCase()) {
      case 'asc':
        array.sort((a, b) => a[key] >= b[key]? 1: 0);
        break;
      case 'desc':
        array.sort((a, b) => a[key] <= b[key]? 1: 0);
        break;
      default:
        array.sort((a, b) => a[key] <= b[key]? 1: 0);
    }
    return array;
  }
}
