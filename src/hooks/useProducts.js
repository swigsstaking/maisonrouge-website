import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://swigs.online/api';
const SITE_SLUG = 'maisonrouge';

// Import static products as fallback
import { products as staticProducts } from '../data/staticProducts';

export const useProducts = () => {
  const { data: apiProducts } = useQuery({
    queryKey: ['products', SITE_SLUG],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/public/products?siteSlug=${SITE_SLUG}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (apiProducts) {
    return apiProducts
      .filter(p => p.isActive)
      .map(p => ({
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
