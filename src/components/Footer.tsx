import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5586999999999?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido", "_blank", "noopener,noreferrer");
  };
  
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6">
          PRONTO PARA
          <span className="block text-primary">ELEVAR O NÍVEL?</span>
        </h2>
        
        <p className="text-base sm:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Chuteiras de alta performance com a melhor qualidade do Piauí. Fale conosco agora e garanta o seu par!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <Button 
            variant="whatsapp" 
            onClick={handleWhatsApp} 
            className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg min-h-[52px]"
          >
            ENTRAR EM CONTATO     
          </Button>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center text-white/70">
            <div className="text-center md:text-left">
              <p className="text-xl sm:text-2xl font-black text-primary">LUSTOSA SPORTS</p>
              <p className="text-sm">Confiança, Qualidade e Preço Justo</p>
            </div>
            
            <div className="text-xs sm:text-sm text-center md:text-right">
              <p>📍 Picos, Piauí</p>
              <p className="mt-1">© 2025 Lustosa Sports. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
