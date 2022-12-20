import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[usAccordionHeader]',
})
export class AccordionHeaderDirective {
  public ref: TemplateRef<HTMLElement>;

  constructor(public templateRef: TemplateRef<HTMLElement>) {
    this.ref = this.templateRef;
  }
}
