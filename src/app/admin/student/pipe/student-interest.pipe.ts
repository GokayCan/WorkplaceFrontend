import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentInterestPipe'
})
export class StudentInterestPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.interestName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name)
    });
  }

}
