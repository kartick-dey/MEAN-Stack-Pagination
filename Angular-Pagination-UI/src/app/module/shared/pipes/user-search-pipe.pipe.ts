import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearchPipe',
})
export class UserSearchPipe implements PipeTransform {

  transform(userList: any[], searchName: string): any[] {
    if (!userList || !searchName) {
      return userList;
    }
    else {
      return userList.filter(user => user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
    }
  }

}
