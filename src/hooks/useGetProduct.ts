import { useEffect, useRef, useState } from "react";
import { ProductDTO } from "../data/dtos/ProductDTO";
import ProductDomain from "../domain/Product";
import { ProductRepository } from "../services/ProductService";

export interface UseGetProductProps {
  productId?: number | string;
}

export const useGetProduct = ({ productId }: UseGetProductProps) => {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [product, setProduct] = useState<ProductDTO | null>(null);

  const productServiceRef = useRef(new ProductDomain(new ProductRepository()));

  useEffect(() => {
    if (!productId) return;

    const fetchProductData = async () => {
      try {
        setLoadingProduct(true);
        const productData = await productServiceRef.current.fetchProductById({
          id: productId,
        });
        setProduct(productData);
      } catch (error) {
        setProduct(null);
        console.error("Failed to fetch product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProductData();
  }, [productId]);

  return {
    product,
    loadingProduct,
  };
};
