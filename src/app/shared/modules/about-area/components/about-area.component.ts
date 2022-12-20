import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'us-about-area',
  templateUrl: './about-area.component.html',
  styleUrls: ['./about-area.component.scss'],
})
export class AboutAreaComponent implements AfterViewInit, OnChanges {
  @Input()
  public height: number;

  @Input()
  public label: string;

  @Input()
  public text: string;

  @ViewChild('textBlock')
  public textBlock: ElementRef;

  @ViewChild('mainBlock')
  public mainBlock: ElementRef;

  @ViewChild('bigBlock')
  public bigBlock: ElementRef;

  public showCoverSide!: boolean;

  public showBtn!: boolean;

  public ngAfterViewInit(): void {
    this.aboutSideConfig();
  }

  public hideCoverSide(event: HTMLElement, block: HTMLElement): void {
    this.showCoverSide = !this.showCoverSide;
    if (this.showCoverSide) {
      event.style.maxHeight = `${this.height - 75}px`;
    } else {
      event.style.maxHeight = 'fit-content';
      block.style.maxHeight = 'max-content';
    }
  }

  private aboutSideConfig(): void {
    setTimeout(() => {
      this.showCoverSide = false;
      this.showBtn = false;
      const mainBlock = this.mainBlock.nativeElement as HTMLElement;
      const textBlock = this.textBlock.nativeElement as HTMLElement;
      const bigBlock = this.bigBlock.nativeElement as HTMLElement;
      if (textBlock.offsetHeight > mainBlock.offsetHeight) {
        this.showCoverSide = true;
        this.showBtn = true;
      } else {
        bigBlock.style.maxHeight = `${this.height}px`;
        mainBlock.style.maxHeight = `${this.height - 75}px`;
        if (textBlock.offsetHeight > mainBlock.offsetHeight) {
          this.showCoverSide = true;
          this.showBtn = true;
        }
      }
    }, 200);
  }

  public ngOnChanges(): void {
    this.showCoverSide = false;
    this.showBtn = false;
    this.aboutSideConfig();
  }
}
