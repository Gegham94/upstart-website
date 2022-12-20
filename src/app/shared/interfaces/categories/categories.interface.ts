export interface CategoriesInterface {
  id: number;
  parent_id: number;
  ordering: number;
  title: string;
  icon: string;
  children: CategoriesInterface[];
}
