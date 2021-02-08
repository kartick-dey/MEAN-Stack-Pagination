import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(arrayList: any[], columnName: string): any[] {
    if (arrayList) {
      let sortedArrayList = arrayList.sort((x, y) => {
        if (x[columnName] > y[columnName]) return 1;
        else if (x[columnName] < y[columnName]) return -1;
        else return 0;
      })
      return sortedArrayList;
    }
    return arrayList;
  }

}
