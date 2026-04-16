export interface ProductFilter {
  categoryId: number | null;
  search: string;
  spiciness?: number;
  noNuts?: boolean;
  vegetarianOnly?: boolean;
}