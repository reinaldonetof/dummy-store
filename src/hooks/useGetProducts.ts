import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductDomain from "../domain/Product";
import {
  FetchProductsParams,
  ProductRepository,
} from "../services/ProductService";
import { ProductRequest } from "../data/dtos/ProductDTO";

const LIMIT = 30;

export const useGetProducts = (params?: FetchProductsParams) => {
  const [page, setPage] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsRequest, setProductsRequest] = useState<ProductRequest | null>(
    null
  );

  const productServiceRef = useRef(new ProductDomain(new ProductRepository()));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const products = await productServiceRef.current.fetchProducts({
          skip: page * LIMIT,
          limit: LIMIT,
        });
        setProductsRequest((prev) =>
          page === 0
            ? products
            : prev?.products
            ? {
                ...products,
                products: [...prev.products, ...products.products],
              }
            : products
        );
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [page]);

  const nextPage = useCallback(() => {
    if (!loadingProducts && productsRequest) {
      const totalLoaded = (page + 1) * LIMIT;
      if (totalLoaded < productsRequest.total) {
        setPage((prev) => prev + 1);
      }
    }
  }, [loadingProducts, productsRequest?.total, page]);

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
  };
};
