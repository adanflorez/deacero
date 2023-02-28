import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  transform(value: unknown): string {
    if (value === 'ADMINISTRATOR') return 'Administrador';
    return 'OSC';
  }
}
