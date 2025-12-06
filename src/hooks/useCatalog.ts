import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  image_url: string;
  description: string | null;
  price: number | null;
  category_id: string | null;
}

export const useCatalog = (categoryFilter?: string) => {
  return useQuery({
    queryKey: ["products", categoryFilter],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (categoryFilter) {
        query = query.eq('category_id', categoryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
      }

      if (!data) {
        return [];
      }

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        image_url: item.image_url || '',
        description: item.description,
        price: item.price,
        category_id: item.category_id,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};
