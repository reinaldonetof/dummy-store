export interface CategoryDTO {
  slug: string;
  name: string;
  url: string;
}

export interface Category extends CategoryDTO {
  selected?: boolean;
}
