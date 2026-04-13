export interface ProductFilter {
  categoryId: number | 'all';
  spiciness: number;
  noNuts: boolean;
  vegetarianOnly: boolean;
}

export const DEFAULT_FILTER: ProductFilter = {
  categoryId: 'all',
  spiciness: 0,
  noNuts: false,
  vegetarianOnly: false,
};
