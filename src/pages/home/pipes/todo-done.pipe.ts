import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoDone'
})
export class TodoDonePipe implements PipeTransform {

  transform(todoDone: boolean, show: boolean): string {
    return todoDone ? '(Done)' : (show ? '(Undo)' : '');
  }

}
