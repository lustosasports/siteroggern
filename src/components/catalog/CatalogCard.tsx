import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/hooks/useCatalog";

interface CatalogCardProps {
  product: Product;
  index: number;
}

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const CatalogCard = ({ product, index }: CatalogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = product.imagem_url && product.imagem_url.trim() !== "" 
    ? product.imagem_url 
    : PLACEHOLDER_IMAGE;

  const handleWhatsApp = () => {
    const phoneNumber = "5582999548018";
    const priceText = product.preco ? ` - R$ ${product.preco.toFixed(2)}` : "";
    const message = `Olá, tenho interesse no produto: ${product.nome}${priceText}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="group bg-card rounded-xl sm:rounded-2xl shadow-lg ring-1 ring-border/50 hover:scale-[1.01] hover:shadow-2xl transition-all duration-200 active:scale-[0.99]"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: "fade-in 300ms ease-out forwards"
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-[4/3] overflow-hidden rounded-t-xl sm:rounded-t-2xl cursor-pointer hover:opacity-90 transition-opacity relative">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <img
              src={imageError ? PLACEHOLDER_IMAGE : imageUrl}
              alt={`Foto do produto ${product.nome}`}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
            {/* Category badge */}
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 text-xs bg-background/80 backdrop-blur-sm"
            >
              {product.categoria}
            </Badge>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full p-0 overflow-hidden rounded-xl sm:rounded-2xl">
          <div className="relative">
            <img
              src={imageError ? PLACEHOLDER_IMAGE : imageUrl}
              alt={`Foto do produto ${product.nome}`}
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain bg-muted"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <Badge className="mb-2">{product.categoria}</Badge>
              <h3 className="text-white text-base sm:text-xl font-semibold">{product.nome}</h3>
              {product.preco && (
                <p className="text-white/80 text-sm sm:text-lg">R$ {product.preco.toFixed(2)}</p>
              )}
              {product.variacoes && (
                <p className="text-white/70 text-xs sm:text-sm mt-1">
                  Tamanhos: {product.variacoes}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="p-3 sm:p-4">
        <h3 
          className="text-sm sm:text-base md:text-lg font-semibold text-foreground line-clamp-2 focus:ring-2 focus:ring-ring focus:outline-none mb-2"
          tabIndex={0}
          title={product.nome}
        >
          {product.nome}
        </h3>
        
        {product.variacoes && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1" title={product.variacoes}>
            Tam: {product.variacoes}
          </p>
        )}
        
        {product.preco && (
          <p className="text-primary font-bold text-sm sm:text-base mb-3">
            R$ {product.preco.toFixed(2)}
          </p>
        )}

        <Button
          onClick={handleWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2 min-h-[44px] transition-all duration-200 text-sm sm:text-base"
        >
          COMPRAR
        </Button>
      </div>
    </div>
  );
};
