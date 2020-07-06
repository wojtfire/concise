import {FormGroup} from '@angular/forms';

export class FormUtils {
  static markAllAsTouchedAndUpdateValue(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
};
