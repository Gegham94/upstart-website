import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'us-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output()
  public pageChange: EventEmitter<number> = new EventEmitter<number>();

  public pageChanged(e: number) {
    this.pageChange.emit(e);
  }
}
