import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyStudentPipe'
})
export class CompanyStudentPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.userName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const number = p.number.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const email = p.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const department = p.departmentName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name + number + email + department)
    });
  }

}
