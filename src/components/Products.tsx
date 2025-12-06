import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCatalog } from "@/hooks/useCatalog";
import { Skeleton } from "@/components/ui/skeleton";

export const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useCatalog();
  
  // Limitar a 4 produtos para os destaques
  const destaques = products?.slice(0, 4) || [];

  const handleWhatsApp = (productName: string) => {
    const message = `Olá, vim pelo site e gostaria de saber mais sobre ${productName}`;
    window.open(`https://wa.me/5582999548018?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleViewCatalog = () => {
    navigate("/catalogo");
  };

  return (
    <section id="produtos" className="py-12 sm:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 sm:mb-4">
            NOSSOS <span className="text-primary">DESTAQUES</span>
          </h2>
          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto px-2">
            Produtos selecionados com qualidade garantida para elevar seu jogo
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2 sm:space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl sm:rounded-2xl bg-white/10" />
                <Skeleton className="h-4 sm:h-6 w-3/4 bg-white/10" />
                <Skeleton className="h-3 sm:h-4 w-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile & Tablet: 2-column grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-3 sm:gap-4 mb-8 sm:mb-16">
              {destaques.map(produto => (
                <div 
                  key={produto.id} 
                  className="bg-white rounded-xl sm:rounded-2xl shadow p-2 sm:p-4 group relative overflow-hidden card-shadow hover:shadow-2xl transition-smooth active:scale-[0.98]"
                >
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                    <img 
                      src={produto.image_url} 
                      alt={produto.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth" 
                      loading="lazy" 
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-2 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-black text-secondary mb-1 sm:mb-2 uppercase tracking-wide line-clamp-2">
                      {produto.name}
                    </h3>
                    {produto.price && (
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-4">
                        R$ {produto.price.toFixed(2)}
                      </p>
                    )}
                    <Button 
                      variant="hero" 
                      onClick={() => handleWhatsApp(produto.name)} 
                      className="w-full text-xs sm:text-sm text-center min-h-[40px] sm:min-h-[44px]"
                    >
                      CONFERIR
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: 4-column grid */}
            <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {destaques.map(produto => (
                <div 
                  key={produto.id} 
                  className="group relative bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-2xl transition-smooth hover:scale-105"
                >
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={produto.image_url} 
                      alt={produto.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth" 
                      loading="lazy" 
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-secondary mb-2 uppercase tracking-wide">
                      {produto.name}
                    </h3>
                    {produto.price && (
                      <p className="text-muted-foreground mb-4">
                        R$ {produto.price.toFixed(2)}
                      </p>
                    )}
                    <Button 
                      variant="hero" 
                      onClick={() => handleWhatsApp(produto.name)} 
                      className="w-full text-sm text-center"
                    >
                      CONFERIR
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="text-center px-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleViewCatalog} 
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-4 min-h-[52px]"
          >
            VER CATÁLOGO COMPLETO
          </Button>
        </div>
      </div>
    </section>
  );
};
