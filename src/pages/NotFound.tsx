import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4 text-red-500">404</h1>
        <p className="text-xl text-white mb-4">Página não encontrada</p>
        <a href="/" className="text-white hover:text-red-500 underline font-bold uppercase tracking-wide">
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
