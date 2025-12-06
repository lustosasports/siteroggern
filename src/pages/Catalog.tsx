import { useState } from "react";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { useCatalog } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const PAGE_SIZE = 20;

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useCatalog({
    categoria: selectedCategory,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const products = data?.products ?? [];
  const totalCount = data?.totalCount ?? 0;
  const hasMore = data?.hasMore ?? false;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px] -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Voltar ao Início</span>
          </Button>
        </div>
        
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 px-2">
            Catálogo <span className="text-primary">Lustosa Sports</span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Produtos esportivos com qualidade garantida
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-4 sm:mb-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
          />
        </div>

        <main>
          {/* Results counter */}
          {!isLoading && !error && (
            <div className="mb-4 sm:mb-6 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                {totalCount === 0 
                  ? "Nenhum produto encontrado"
                  : `Exibindo ${products.length} de ${totalCount} produto(s)`
                }
              </p>
            </div>
          )}
          
          <CatalogGrid 
            products={products} 
            isLoading={isLoading} 
            error={error as Error | null} 
          />

          {/* Pagination */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="min-h-[44px] px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!hasMore}
                className="min-h-[44px] px-4"
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </main>
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Catalog;
