import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  categoria: string;
  variacoes: string | null;
  created_at: string | null;
}

interface UseCatalogOptions {
  categoria?: string | null;
  page?: number;
  pageSize?: number;
}

interface CatalogResult {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
}

const TABLE_MAP: Record<string, string> = {
  campo: "chuteiras_campo",
  futsal: "chuteiras_futsal",
  society: "chuteiras_society",
  caneleiras: "caneleiras",
  bolsas: "bolsas",
};

const CATEGORY_LABELS: Record<string, string> = {
  chuteiras_campo: "Campo",
  chuteiras_futsal: "Futsal",
  chuteiras_society: "Society",
  caneleiras: "Caneleiras",
  bolsas: "Bolsas",
};

async function fetchFromTable(
  tableName: string,
  categoria: string,
  offset: number,
  limit: number
): Promise<Product[]> {
  // Determine which field contains variations
  const variationField = tableName === "caneleiras" ? "tamanhos" : 
                         tableName === "bolsas" ? null : "numeracoes";
  
  const selectFields = variationField 
    ? `id, nome, preco, imagem_url, categoria, ${variationField}, created_at`
    : `id, nome, preco, imagem_url, categoria, created_at`;

  const { data, error } = await supabase
    .from(tableName as any)
    .select(selectFields)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(`Erro ao buscar de ${tableName}:`, error);
    return [];
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    nome: item.nome,
    preco: item.preco,
    imagem_url: item.imagem_url,
    categoria: categoria,
    variacoes: variationField ? item[variationField] : null,
    created_at: item.created_at,
  }));
}

async function fetchAllProducts(
  categoriaFilter: string | null,
  page: number,
  pageSize: number
): Promise<CatalogResult> {
  const offset = (page - 1) * pageSize;

  // If filtering by category, only fetch from that table
  if (categoriaFilter) {
    const tableName = TABLE_MAP[categoriaFilter.toLowerCase()];
    if (!tableName) {
      return { products: [], totalCount: 0, hasMore: false };
    }

    const categoryLabel = CATEGORY_LABELS[tableName];
    
    // Fetch products with pagination
    const products = await fetchFromTable(tableName, categoryLabel, offset, pageSize);
    
    // Get total count for this table
    const { count } = await supabase
      .from(tableName as any)
      .select("*", { count: "exact", head: true });

    return {
      products,
      totalCount: count || 0,
      hasMore: (count || 0) > offset + pageSize,
    };
  }

  // Fetch from all tables in parallel
  const tableEntries = Object.entries(TABLE_MAP);
  const allProductsArrays = await Promise.all(
    tableEntries.map(([, tableName]) =>
      fetchFromTable(tableName, CATEGORY_LABELS[tableName], 0, 1000)
    )
  );

  // Combine and sort all products by created_at
  const allProducts = allProductsArrays
    .flat()
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

  // Apply pagination
  const paginatedProducts = allProducts.slice(offset, offset + pageSize);
  const totalCount = allProducts.length;

  return {
    products: paginatedProducts,
    totalCount,
    hasMore: totalCount > offset + pageSize,
  };
}

export const useCatalog = (options: UseCatalogOptions = {}) => {
  const { categoria = null, page = 1, pageSize = 20 } = options;

  return useQuery({
    queryKey: ["catalog", categoria, page, pageSize],
    queryFn: () => fetchAllProducts(categoria, page, pageSize),
    staleTime: 60 * 1000, // Cache for 60 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
};

// Hook for loading more products (infinite scroll alternative)
export const useCatalogPaginated = (categoria?: string | null) => {
  return useCatalog({ categoria, page: 1, pageSize: 20 });
};
