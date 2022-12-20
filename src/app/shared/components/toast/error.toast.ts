import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  styles: [
    `
      :host {
        overflow: hidden;
        margin: 0 0 6px;
        border-radius: 3px 3px 3px 3px;
        color: #ffffff;
        pointer-events: all;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .btn-pink {
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .toast-message {
        font-size: 13px;
        padding: 5px 0;
      }
      ::ng-deep.toast-error {
        background-image: url('../../../../assets/images/close_circle.svg') !important;
      }
    `,
  ],
  template: `
    <div class="row" [style.display]="state.value === 'inactive' ? 'none' : ''">
      <div class="col-11">
        <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
          {{ title }}
        </div>
        <div
          *ngIf="message && options.enableHtml"
          role="alert"
          [class]="options.messageClass"
          [innerHTML]="message"
        ></div>
        <div
          *ngIf="message && !options.enableHtml"
          role="alert"
          [class]="options.messageClass"
          [attr.aria-label]="message"
          [innerHTML]="message"
        ></div>
      </div>
      <div class="col-1 text-right">
        <a *ngIf="!options.closeButton" class="btn btn-pink btn-sm" (click)="action($event)">
          <img
            (click)="remove()"
            src="../../../../assets/images/close.png"
            style="width: 15px;height: 15px"
          />
        </a>
      </div>
    </div>
    <div *ngIf="options.progressBar">
      <div class="toast-progress" [style.width]="width + '%'"></div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 1,
        }),
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
              opacity: 0,
            }),
            style({
              transform: 'skewX(20deg)',
              opacity: 1,
            }),
            style({
              transform: 'skewX(-5deg)',
              opacity: 1,
            }),
            style({
              transform: 'none',
              opacity: 1,
            }),
          ]),
        ),
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(100%, 0, 0) skewX(30deg)',
              opacity: 0,
            }),
          ]),
        ),
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ErrorToastComponent extends Toast {
  // used for demo purposes
  public undoString: string = 'undo';

  constructor(
    public override toastrService: ToastrService,

    public override toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  public action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
