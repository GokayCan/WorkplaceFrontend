import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentPipe'
})
export class StudentPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (filterText == "" || filterText == null) {
      return value;
    }

    return value.filter(p=> {
      const firstName = p.firstName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const lastName = p.lastName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const number = p.number.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const departmentName = p.departmentName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const email = p.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (firstName+lastName+number+departmentName+email)
    });
  }

}
