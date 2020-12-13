import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ngModel][appEmailValidator]'
})
export class EmailValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }

}
