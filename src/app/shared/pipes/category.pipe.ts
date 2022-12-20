import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesInterface } from '../interfaces/categories/categories.interface';
import { DeepSearchHelper } from '../helpers/deep-search.helper';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  public transform(value: number, categoryList: CategoriesInterface[]): string {
    return DeepSearchHelper.findFirstObject(categoryList, String(value), true, 'id')?.title ?? '';
  }
}
