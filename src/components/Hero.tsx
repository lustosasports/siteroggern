import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-soccer.jpg";
import lustosaLogo from "@/assets/lustosa-logo.jpg";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  
  const handleWhatsApp = () => {
    window.open("https://wa.me/5586999999999?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido", "_blank", "noopener,noreferrer");
  };
  
  const handleCatalog = () => {
    navigate("/catalogo");
  };
  
  const handleScrollDown = () => {
    const productsSection = document.getElementById("produtos");
    productsSection?.scrollIntoView({
      behavior: "smooth"
    });
  };
  
  const handleInstagram = () => {
    window.open("https://instagram.com/lustosasports", "_blank", "noopener,noreferrer");
  };
  
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-8">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src={lustosaLogo} 
            alt="Lustosa Sports Logo" 
            className="w-32 sm:w-48 md:w-64 lg:w-72 h-auto rounded-xl shadow-2xl" 
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight text-primary mb-4 sm:mb-6">
          <span className="block">LUSTOSA</span>
          <span className="block text-white">SPORTS</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 mb-3 sm:mb-4 max-w-2xl mx-auto px-2">
          CONFIANÇA, QUALIDADE E PREÇO JUSTO
        </p>
        
        <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto px-2">
          📍 Picos, Piauí • Enviamos para todo o Brasil
        </p>
        
        {/* Buttons - Stack on very small screens */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 px-2">
          <Button 
            variant="hero" 
            onClick={handleCatalog} 
            className="w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-xl font-semibold whitespace-nowrap shadow-lg transition text-base"
          >
            VER CATÁLOGO
          </Button>
          
          <Button 
            variant="whatsapp" 
            onClick={handleWhatsApp} 
            className="w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-xl font-semibold whitespace-nowrap shadow-lg transition text-base"
          >
            WHATSAPP
          </Button>
          
          <Button 
            variant="catalog" 
            onClick={handleInstagram} 
            className="w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-xl font-semibold whitespace-nowrap shadow-lg transition text-base"
          >
            INSTAGRAM
          </Button>
        </div>
        
        <div className="mt-8 sm:mt-12 text-primary text-xs sm:text-sm font-semibold tracking-wider px-2">
          <p>CHUTEIRAS E MATERIAIS ESPORTIVOS • QUALIDADE GARANTIDA</p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={handleScrollDown} 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-full p-3 min-h-[48px] min-w-[48px] flex items-center justify-center" 
        aria-label="Scroll to products section"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};
