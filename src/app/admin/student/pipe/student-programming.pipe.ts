import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentProgrammingPipe'
})
export class StudentProgrammingPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.programmingName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name)
    });
  }

}
