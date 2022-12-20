import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[usAccordionContent]',
})
export class AccordionContentDirective {
  public ref: TemplateRef<HTMLElement>;

  constructor(public templateRef: TemplateRef<HTMLElement>) {
    this.ref = this.templateRef;
  }
}
