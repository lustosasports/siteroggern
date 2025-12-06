import { useState } from "react";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { useCatalog } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: products = [], isLoading, error } = useCatalog(selectedCategory || undefined);

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

        {/* Filtro de Categoria */}
        <div className="mb-4 sm:mb-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        <main>
          {/* Contador de resultados */}
          {!isLoading && !error && (
            <div className="mb-4 sm:mb-6 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                {`${products.length} produto(s) no catálogo`}
              </p>
            </div>
          )}
          
          <CatalogGrid 
            products={products} 
            isLoading={isLoading} 
            error={error} 
          />
        </main>
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Catalog;
