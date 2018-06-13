import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {
  transform(decimal: number, precision: number = 0): number {
    const rounder = Math.pow(10, precision);
    const normalizedDecimal = +(decimal * rounder).toFixed(precision);
    return Math.round(normalizedDecimal) / rounder;
  }
}
