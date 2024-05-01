import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libAutoTab]'
})
export class AutoTabDirective {
  @Input() libAutoTab:any;
  constructor() {}
  @HostListener('input', ['$event.target']) onInput(input:any) {
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;

    if (length >= maxLength && this.libAutoTab.name) {
      const field = document.getElementsByName(this.libAutoTab.name)[0];
      if (field) {
        field.focus();
      }
    }
  }
}
