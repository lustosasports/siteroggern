-- Add numeros_disponiveis column to chuteiras table
ALTER TABLE public.chuteiras 
ADD COLUMN numeros_disponiveis text[] DEFAULT ARRAY[]::text[];

-- Add some sample data for testing
INSERT INTO public.chuteiras (nome, foto_url, numeros_disponiveis) VALUES 
('Nike Mercurial Vapor 15', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', ARRAY['38', '39', '40', '41', '42']),
('Adidas Predator Accuracy', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop', ARRAY['39', '40', '41', '42', '43']),
('Puma Future Z', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', ARRAY['38', '40', '41', '43', '44']),
('Nike Phantom GT2', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', ARRAY['39', '40', '42', '43', '44']),
('Adidas Copa Sense', 'https://images.unsplash.com/photo-1574494431536-2a09bfcfb97c?w=400&h=300&fit=crop', ARRAY['38', '39', '41', '42', '43'])
ON CONFLICT (id) DO NOTHING;