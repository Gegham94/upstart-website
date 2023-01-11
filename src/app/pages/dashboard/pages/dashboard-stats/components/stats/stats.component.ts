import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/shared/interfaces/stats/stats';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'us-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  public wishListIndex: number[] = [];

  public basketIndex: number[] = [];

  public basketStudents: number = 0;

  public wishListStudents: number = 0;

  public stats!: Stats;

  public loader: boolean = true;

  private clickedElement!: HTMLElement;

  private clickedElementList!: HTMLElement;

  public studentName: string = '';

  constructor(private statService: StatsService) {}

  public ngOnInit(): void {
    this.getStats();
  }

  public expandItem(expandItem: HTMLElement, event: MouseEvent): void {
    event.stopPropagation();
    expandItem.classList.add('active-expand');
    this.clickedElement = expandItem;
  }

  public expandItemList(expandItem: HTMLElement, event: MouseEvent): void {
    event.stopPropagation();
    expandItem.classList.add('active-expand');
    this.clickedElementList = expandItem;
  }

  public outside(): void {
    if (this.clickedElement) this.clickedElement.classList.remove('active-expand');
  }

  public outsideList(): void {
    if (this.clickedElementList) this.clickedElementList.classList.remove('active-expand');
  }

  public expendWishList(event: number): void {
    if (!this.wishListIndex.includes(event)) {
      this.wishListIndex.push(event);
    } else {
      this.wishListIndex = this.wishListIndex.filter((index) => index !== event);
    }
  }

  public getStats(): void {
    this.statService.getStats().subscribe((res) => {
      this.stats = res.data;
      this.loader = false;
      this.stats.in_basket?.forEach((course) => {
        this.basketStudents = course.students.length;
        // course.students.push()
        course.students.forEach((student) => {
          const names = student.name.split(' ');
          student.letters = names[0].slice(0, 1) + '' + names[1].slice(0, 1);
        });
      });
      this.stats.in_wish_list?.forEach((course) => {
        this.wishListStudents = course.students.length;
        course.students.forEach((student) => {
          const names = student.name.split(' ');
          student.letters = names[0].slice(0, 1) + '' + names[1].slice(0, 1);
        });
      });
    });
  }
}
