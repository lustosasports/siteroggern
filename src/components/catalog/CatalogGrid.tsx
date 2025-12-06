import { Skeleton } from "@/components/ui/skeleton";
import { CatalogCard } from "./CatalogCard";

interface Product {
  id: string;
  name: string;
  image_url: string;
  description: string | null;
  price: number | null;
  category_id: string | null;
}

interface CatalogGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const CatalogGrid = ({ products, isLoading, error }: CatalogGridProps) => {
  // Loading state com skeleton grid
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2 sm:space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg sm:rounded-xl" />
            <Skeleton className="h-4 sm:h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-semibold text-destructive mb-2">
            Erro ao carregar catálogo
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Não foi possível carregar os produtos. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="bg-muted/50 border border-border rounded-lg p-6 sm:p-8 max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
            Nenhum produto cadastrado
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            O catálogo ainda não possui produtos disponíveis.
          </p>
        </div>
      </div>
    );
  }

  // Grid with products - 2 columns mobile, 3 tablet, 4 desktop
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product, index) => (
        <CatalogCard 
          key={product.id} 
          product={product} 
          index={index}
        />
      ))}
    </div>
  );
};
