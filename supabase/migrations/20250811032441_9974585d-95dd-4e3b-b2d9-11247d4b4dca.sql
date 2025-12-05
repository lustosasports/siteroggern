-- Create chuteiras table for the shoe catalog
CREATE TABLE public.chuteiras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  foto_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chuteiras ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read chuteiras (public catalog)
CREATE POLICY "Anyone can view chuteiras" 
ON public.chuteiras 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to insert chuteiras
CREATE POLICY "Authenticated users can insert chuteiras" 
ON public.chuteiras 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to update chuteiras
CREATE POLICY "Authenticated users can update chuteiras" 
ON public.chuteiras 
FOR UPDATE 
TO authenticated
USING (true);

-- Create policy to allow authenticated users to delete chuteiras
CREATE POLICY "Authenticated users can delete chuteiras" 
ON public.chuteiras 
FOR DELETE 
TO authenticated
USING (true);