-- Criar tabela de chuteiras
CREATE TABLE public.chuteiras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  foto_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.chuteiras ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (anônima)
CREATE POLICY "Permitir leitura pública das chuteiras"
ON public.chuteiras
FOR SELECT
USING (true);

-- Negar INSERT/UPDATE/DELETE para usuários anônimos (apenas service role/admin)
-- (As políticas de escrita não são criadas intencionalmente para negar acesso anônimo)

-- Criar bucket de storage para produtos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('produtos', 'produtos', true);

-- Política para leitura pública do bucket produtos
CREATE POLICY "Leitura pública de imagens de produtos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'produtos');

-- Política para upload apenas por usuários autenticados (service role)
CREATE POLICY "Upload de produtos apenas para admins"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'produtos' AND auth.role() = 'service_role');

-- Inserir dados de exemplo para teste
INSERT INTO public.chuteiras (nome, foto_url) VALUES
('Nike Mercurial Vapor 15', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&q=80'),
('Adidas Predator Edge', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80'),
('Puma Future Z 1.3', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'),
('Nike Phantom GT2', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80'),
('Adidas Copa Sense', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80'),
('Puma Ultra 1.4', 'https://images.unsplash.com/photo-1615887023519-3e0f16c89a75?w=400&q=80'),
('Nike Tiempo Legend 9', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80');