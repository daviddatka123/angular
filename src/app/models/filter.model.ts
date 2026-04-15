export interface ProductFilter {
  categoryId: number | 'all';
  search: string;
  spiciness?: number;
  noNuts?: boolean;
  vegetarianOnly?: boolean;
}