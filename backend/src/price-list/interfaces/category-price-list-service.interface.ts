export interface CategoryPriceListServiceIface {
  supportedCategoryId: number;
  isSupported: (categoryId: number) => boolean;
};