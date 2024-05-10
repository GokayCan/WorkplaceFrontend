import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyPipe'
})
export class CompanyPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const sector = p.sectorName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name+sector)
    });
  }

}
