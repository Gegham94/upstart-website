import { Component, ContentChildren, Input, OnChanges, QueryList } from '@angular/core';
import { AccordionItemDirective } from '../directives/accordion-item.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'us-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('contentExpansion', [
      state(
        'expanded',
        style({ height: '*', opacity: 1, visibility: 'visible', overflow: 'hidden' }),
      ),
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, visibility: 'hidden', overflow: 'hidden' }),
      ),
      transition('expanded <=> collapsed', animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ]),
  ],
})
export class AccordionComponent implements OnChanges {
  public expanded: Set<number> = new Set<number>();

  @Input()
  public autoOpen = false;

  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */
  @Input()
  public collapsing = true;

  @ContentChildren(AccordionItemDirective)
  public items!: QueryList<AccordionItemDirective>;

  public ngOnChanges() {
    if (this.autoOpen) {
      this.expanded.add(0);
    }
  }

  public getToggleState(index: number): () => void {
    return this.toggleState.bind(this, index);
  }

  public toggleState(index: number): void {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  }
}
