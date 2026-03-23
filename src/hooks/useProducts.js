import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import staticProducts from '../data/staticProducts';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

export const useProducts = () => {
  const { siteId } = useAuth();

  const { data: apiProducts } = useQuery({
    queryKey: ['products', siteId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/public?siteId=${siteId}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      return json.data;
    },
    enabled: !!siteId,
    staleTime: 1000 * 60 * 5,
  });

  if (apiProducts && apiProducts.length > 0) {
    return apiProducts.map(p => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      category: p.category?.name || p.category?.slug || '',
      price: p.price?.amount != null ? p.price : { amount: p.price?.amount ?? 0, currency: 'CHF' },
      image: p.images?.[0] || '',
      images: p.images || [],
      description: p.description || '',
      shortDescription: p.shortDescription || '',
    }));
  }

  return staticProducts || [];
};

export const useProduct = (slug) => {
  const products = useProducts();
  return products.find(p => p.slug === slug) || null;
};
