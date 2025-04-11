import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spicy',
  standalone: true,
})
export class SpicyPipe implements PipeTransform {
  transform(value: number): string {
    return '🌶️'.repeat(value);
  }
}
