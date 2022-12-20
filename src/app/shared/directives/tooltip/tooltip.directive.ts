import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './components/tooltip.component';

@Directive({ selector: '[usTooltip]' })
export class TooltipDirective implements OnInit {
  @Input('usTooltip')
  public text = '';

  private overlayRef: OverlayRef;

  private debounceTimer: NodeJS.Timeout;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  public show(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
        new ComponentPortal(TooltipComponent),
      );
      tooltipRef.instance.text = this.text;
    }, 400);
  }

  @HostListener('mouseleave')
  public hide(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.overlayRef.detach();
  }
}
