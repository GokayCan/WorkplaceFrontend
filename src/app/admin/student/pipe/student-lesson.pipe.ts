import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentLessonPipe'
})
export class StudentLessonPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (filterText == "" || filterText == null) {
      return value;
    }

    return value.filter(p => {
      const name = p.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const code = p.code.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const departmentName = p.departmentName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const stuffName = p.stuffName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const studentName = p.studentName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return (name + departmentName + stuffName + code + studentName)
    });
  }

}
