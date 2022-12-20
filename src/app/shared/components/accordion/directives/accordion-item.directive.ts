import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionHeaderDirective } from './accordion-header.directive';
import { AccordionTitleDirective } from './accordion-title.directive';
import { AccordionContentDirective } from './accordion-content.directive';

@Directive({
  selector: '[usAccordionItem]',
})
export class AccordionItemDirective {
  @Input()
  public title: string = '';

  @Input()
  public disabled: boolean = false;

  @ContentChild(AccordionContentDirective)
  public content?: AccordionContentDirective;

  @ContentChild(AccordionTitleDirective)
  public customTitle?: AccordionTitleDirective;

  @ContentChild(AccordionHeaderDirective)
  public customHeader?: AccordionHeaderDirective;
}
