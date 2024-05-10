import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyStaffPipe'
})
export class CompanyStaffPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.userName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const department = p.departmentName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name + department)
    });
  }

}