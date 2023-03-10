import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './components/accordion.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';
import { AccordionTitleDirective } from './directives/accordion-title.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionHeaderDirective,
    AccordionTitleDirective,
  ],
})
export class AccordionModule {}
