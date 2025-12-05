import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Chuteira {
  id: string;
  nome: string;
  foto_url: string;
  numeros_disponiveis: string[];
}

interface CatalogCardProps {
  chuteira: Chuteira;
  index: number;
}

export const CatalogCard = ({ chuteira, index }: CatalogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleWhatsApp = () => {
    if (!selectedSize) return;
    
    const phoneNumber = "5582999548018";
    const message = `Olá, tenho interesse na chuteira ${chuteira.nome}, tamanho ${selectedSize}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
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
          <div className="aspect-[4/3] overflow-hidden rounded-t-xl sm:rounded-t-2xl cursor-pointer hover:opacity-90 transition-opacity">
            {!imageError ? (
              <>
                {!imageLoaded && (
                  <div className="w-full h-full bg-muted animate-pulse" />
                )}
                <img
                  src={chuteira.foto_url}
                  alt={`Foto da chuteira ${chuteira.nome}`}
                  className={`w-full h-full object-cover transition-opacity duration-200 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center p-2 sm:p-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Imagem não disponível</p>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full p-0 overflow-hidden rounded-xl sm:rounded-2xl">
          <div className="relative">
            <img
              src={chuteira.foto_url}
              alt={`Foto da chuteira ${chuteira.nome}`}
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <h3 className="text-white text-base sm:text-xl font-semibold">{chuteira.nome}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="p-3 sm:p-4">
        <h3 
          className="text-sm sm:text-base md:text-lg font-semibold text-foreground line-clamp-2 focus:ring-2 focus:ring-ring focus:outline-none mb-2"
          tabIndex={0}
          title={chuteira.nome}
        >
          {chuteira.nome}
        </h3>
        
        {/* Seleção de Tamanhos */}
        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">Selecione o tamanho:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {chuteira.numeros_disponiveis.map((numero) => (
              <Button
                key={numero}
                variant={selectedSize === numero ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === numero ? null : numero)}
                className="min-w-[36px] sm:min-w-[40px] h-8 sm:h-9 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 sm:hover:scale-105 px-2"
              >
                {numero}
              </Button>
            ))}
          </div>
        </div>

        {/* Botão COMPRAR */}
        <Button
          onClick={handleWhatsApp}
          disabled={!selectedSize}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-2 min-h-[44px] transition-all duration-200 text-sm sm:text-base"
        >
          {selectedSize ? "COMPRAR" : "SELECIONE UM TAMANHO"}
        </Button>
      </div>
    </div>
  );
};
