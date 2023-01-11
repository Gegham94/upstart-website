export interface CourseGlobalFilter {
  categories: FilterItem;
  level: FilterItem;
  type: FilterItem;
  language_id: FilterItem;
  price: FilterItem;
}

export interface FilterItem {
  label: string;
  ids?: number[];
}
