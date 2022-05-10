import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValue'
})
export class GetValuePipe implements PipeTransform {

  transform(obj: any, path: string): any {
    let result = obj;

    for (let p of path.split('.')) {
      if (result[p] == undefined) {
        return null;
      }
      result = result[p]
    }

    return result
  }

}