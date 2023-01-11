import {
  Directive,
  Input,
  TemplateRef,
  OnInit,
  ElementRef,
  HostListener,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ComponentType, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TooltipOrientationEnum } from '../../enums/tooltip-orientation.enum';
import { HorizontalFlexiblePositions, VerticalFlexiblePositions } from './constants/orientations';

@Directive({
  selector: '[usDropdown]',
})
export class DropdownDirective implements OnInit {
  @Input()
  public tooltipContent?: TemplateRef<unknown> | ComponentType<unknown> | null;

  @Input()
  public tooltipOrientation?: TooltipOrientationEnum = TooltipOrientationEnum.vertical;

  @Input()
  public tooltipReversed?: boolean = false;

  @Output()
  public dropdownClosed: EventEmitter<void> = new EventEmitter<void>();

  private overlayRef!: OverlayRef;

  constructor(
    private readonly overlay: Overlay,
    private readonly overlayPositionBuilder: OverlayPositionBuilder,
    private readonly elementRef: ElementRef,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    if (this.tooltipContent) {
      const orientation =
        this.tooltipOrientation === TooltipOrientationEnum.vertical
          ? VerticalFlexiblePositions
          : HorizontalFlexiblePositions;

      const position = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions(this.tooltipReversed ? orientation.slice().reverse() : orientation);

      this.overlayRef = this.overlay.create({
        positionStrategy: position,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        panelClass: 'custom-dropdown',
      });
    }
  }

  @HostListener('click')
  private show(): void {
    if (this.overlayRef && this.tooltipContent) {
      this.overlayRef.detach();
      let containerPortal: TemplatePortal<unknown> | ComponentPortal<unknown>;

      if (this.tooltipContent instanceof TemplateRef) {
        containerPortal = new TemplatePortal(this.tooltipContent, this.viewContainerRef);
      } else {
        containerPortal = new ComponentPortal(this.tooltipContent, this.viewContainerRef);
      }

      this.elementRef.nativeElement.classList.add('toggled');

      this.overlayRef.attach(containerPortal);
    }
  }

  @HostListener('document:click', ['$event.target'])
  private onDocumentClick(target: EventTarget) {
    const clickedInside =
      this.elementRef.nativeElement.contains(target) ||
      this.overlayRef.overlayElement.contains(target as Node);
    if (!clickedInside) {
      this.hide();
    }
  }

  @HostListener('document:wheel')
  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.elementRef.nativeElement.classList.remove('toggled');
    }
    this.dropdownClosed.emit();
  }
}
