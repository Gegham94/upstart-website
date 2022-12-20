import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[usAccordionTitle]',
})
export class AccordionTitleDirective {
  public ref: TemplateRef<HTMLElement>;

  constructor(public templateRef: TemplateRef<HTMLElement>) {
    this.ref = this.templateRef;
  }
}
