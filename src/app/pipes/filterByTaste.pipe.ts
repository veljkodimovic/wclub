import { Pipe, PipeTransform } from '@angular/core';
//import { HTTPClientFactory, SimpleProduct } from '@woocommerce/api';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'filterByTaste' })
export class FilterByTastePipe implements PipeTransform {
  transform(orignal: any[], keywords: any[]): any[] {
    if (keywords.length == 0) return orignal;
    let newArray: any[] = [];
    for (let i = 0; i < orignal.length; i++) {
      for (let j = 0; j < orignal[i].tags.length; j++) {
        if (keywords.indexOf(orignal[i].tags[j].slug) != -1) {
          if (newArray.indexOf(orignal[i]) == -1) {
            newArray.push(orignal[i]);
          }
        }
      }
    }

    //console.log(newArray);
    return newArray;
  }
}
