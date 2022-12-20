import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[usClickOutside]',
})
export class ClickOutsideDirective {
  @Output()
  public clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: EventTarget) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
