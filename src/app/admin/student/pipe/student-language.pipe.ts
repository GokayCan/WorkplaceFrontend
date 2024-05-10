import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentLanguagePipe'
})
export class StudentLanguagePipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (!value) {
      return [];
    }

    return value.filter(p => {
      const name = p.languageName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name)
    });
  }

}
