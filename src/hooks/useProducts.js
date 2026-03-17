import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch('/products-data.json', {
          signal: abortController.signal
        });
        if (!isMounted) return;

        const data = await response.json();
        const loadedProducts = data.products || [];

        if (isMounted) {
          setProducts(loadedProducts);
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        // Silently handle errors - don't log in production
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { products, isLoading };
}
