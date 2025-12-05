import { useState, useEffect } from "react";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { SizeFilter } from "@/components/catalog/SizeFilter";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { useCatalog } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const CATEGORIES_WITH_NUMERACAO = ["campo", "futsal", "society"];
const CATEGORIES_WITH_TAMANHO = ["caneleiras"];

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: chuteiras = [], isLoading, error } = useCatalog(selectedSize || undefined);

  // Reset size filter when category changes
  useEffect(() => {
    setSelectedSize(null);
  }, [selectedCategory]);

  const showNumeracaoFilter = selectedCategory && CATEGORIES_WITH_NUMERACAO.includes(selectedCategory);
  const showTamanhoFilter = selectedCategory && CATEGORIES_WITH_TAMANHO.includes(selectedCategory);

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
            Chuteiras e materiais esportivos com qualidade garantida
          </p>
        </header>

        {/* Filtro de Categoria */}
        <div className="mb-4 sm:mb-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Filtro de Numeração - apenas para CAMPO, FUTSAL, SOCIETY */}
        {showNumeracaoFilter && (
          <div className="mb-4 sm:mb-8">
            <SizeFilter 
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              filterType="numeracao"
            />
          </div>
        )}

        {/* Filtro de Tamanho - apenas para CANELEIRAS */}
        {showTamanhoFilter && (
          <div className="mb-4 sm:mb-8">
            <SizeFilter 
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              filterType="tamanho"
            />
          </div>
        )}

        <main>
          {/* Contador de resultados */}
          {!isLoading && !error && (
            <div className="mb-4 sm:mb-6 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                {selectedSize 
                  ? `${chuteiras.length} produto(s) encontrado(s) no tamanho ${selectedSize}`
                  : `${chuteiras.length} produto(s) no catálogo`
                }
              </p>
            </div>
          )}
          
          <CatalogGrid 
            chuteiras={chuteiras} 
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
