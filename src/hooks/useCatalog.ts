import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Chuteira {
  id: string;
  nome: string;
  foto_url: string;
  numeros_disponiveis: string[];
}

export const useCatalog = (numeroFiltro?: string) => {
  return useQuery({
    queryKey: ["chuteiras", numeroFiltro],
    queryFn: async (): Promise<Chuteira[]> => {
      // Buscar chuteiras do Supabase
      const { data, error } = await supabase
        .from('chuteiras')
        .select('*')
        .order('nome', { ascending: true });

      if (error) {
        console.error('Erro ao buscar chuteiras:', error);
        throw error;
      }

      if (!data) {
        return [];
      }

      // Transformar os dados do Supabase para o formato esperado
      const chuteiras: Chuteira[] = data.map((item) => ({
        id: item.id.toString(),
        nome: item.nome,
        foto_url: item.url_imagem || '',
        numeros_disponiveis: item.tamanho ? item.tamanho.split(',').map(t => t.trim()) : []
      }));

      // Aplicar filtro de numeração se especificado
      if (numeroFiltro) {
        return chuteiras.filter(chuteira => 
          chuteira.numeros_disponiveis.includes(numeroFiltro)
        );
      }

      return chuteiras;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos de cache
  });
};