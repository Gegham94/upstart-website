import { ConnectedPosition } from '@angular/cdk/overlay';

export const VerticalFlexiblePositions: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 8,
  },
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetX: 0,
    offsetY: -8,
  },
];

export const HorizontalFlexiblePositions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -8,
    offsetY: 0,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 0,
    offsetY: -13,
  },
];
