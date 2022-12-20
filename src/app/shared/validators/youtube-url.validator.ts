import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function youtubeUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) return null;

    const youtubeRegexp = new RegExp(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gim,
    );

    const isYoutubeUrl = youtubeRegexp.test(value);

    return !isYoutubeUrl ? { youtube: true } : null;
  };
}
