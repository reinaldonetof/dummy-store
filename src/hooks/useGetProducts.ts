import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductDomain from "../domain/Product";
import {
  FetchProductsParams,
  ProductRepository,
} from "../services/ProductService";
import { ProductRequest } from "../data/dtos/ProductDTO";

const LIMIT = 30;

export interface UseGetProductsProps {
  categorySlug?: string;
}

export type SortOrder = FetchProductsParams["order"];

export const useGetProducts = ({ categorySlug }: UseGetProductsProps) => {
  const [page, setPage] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingNewProducts, setLoadingNewProducts] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [productsRequest, setProductsRequest] = useState<ProductRequest | null>(
    null
  );
  const productServiceRef = useRef(new ProductDomain(new ProductRepository()));

  const fetchProducts = useCallback(
    async (currentPage: number, category?: string, order?: SortOrder) => {
      try {
        setLoadingProducts(true);
        const productsRequest =
          await productServiceRef.current.fetchProductsWithParams({
            skip: currentPage * LIMIT,
            limit: LIMIT,
            category,
            order,
          });
        setProductsRequest((prev) =>
          currentPage === 0
            ? productsRequest
            : prev?.products
            ? {
                ...productsRequest,
                products: [...prev.products, ...productsRequest.products],
              }
            : productsRequest
        );
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingProducts(false);
        setLoadingNewProducts(false);
      }
    },
    []
  );

  useEffect(() => {
    setLoadingNewProducts(true);
    setPage(0);
    fetchProducts(0, categorySlug, sortOrder);
  }, [categorySlug, sortOrder]);

  const nextPage = useCallback(() => {
    if (!loadingProducts && productsRequest) {
      const totalLoaded = (page + 1) * LIMIT;
      if (totalLoaded < productsRequest.total) {
        fetchProducts(page + 1, categorySlug, sortOrder);
        setPage((prev) => prev + 1);
      }
    }
  }, [loadingProducts, productsRequest?.total, page, categorySlug, sortOrder]);

  const changeSortOrder = useCallback((newOrder: SortOrder) => {
    setSortOrder(newOrder);
  }, []);

  const currentProductsShowingValue = useMemo(() => {
    const currentVal = (productsRequest?.skip || 0) + LIMIT;
    return currentVal < (productsRequest?.total || 0)
      ? currentVal
      : productsRequest?.total;
  }, [productsRequest?.skip, productsRequest?.total]);

  return {
    productsRequest,
    loadingProducts,
    nextPage,
    currentProductsShowingValue,
    loadingNewProducts,
    sortOrder,
    changeSortOrder,
  };
};