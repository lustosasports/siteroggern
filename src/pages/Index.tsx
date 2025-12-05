import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Products />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
