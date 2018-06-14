import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {
  /**
   * The mathematical method of more correct rounding of float pointing numbers
   */
  // THE ISSUE:
  // JavaScript Engine uses 64-bit floating point representation that cannot accurately represent numbers like 0.1, 0.2 or 0.3 at all
  // For 0.1 in the standard binary64 = 0.1000000000000000055511151231257827021181583404541015625
  // 0.1 + 0.2 = 0.30000000000000004
  // More as an example we can round 1.005 with 2 decimal places fixation
  // The result will be 1.00 because in fact actual representation of 1.005 is 1.004999..
  // That is why the answer is wrong and unexpected

  // THE SOLUTION:
  // The floating point representation issue can be avoided by shifting right the floating point of the decimal number
  // and fixed truncation/rounding the result to n decimal places
  // Rounding of 1.005 to 2 decimal places by this method:
  // 1.005 * 100 = 100.49999999999999
  // 100.49999999999999.toFixed(2) = +"100.50" = 100.50
  // Math.round(100.50) / 100 = 101 / 100 = 1.01
  transform(decimal: number, precision: number = 0): number {
    const rounder = Math.pow(10, precision);
    const normalizedDecimal = +(decimal * rounder).toFixed(precision);
    return Math.round(normalizedDecimal) / rounder;
  }
}
