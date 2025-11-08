-- Create table for saved content
CREATE TABLE public.saved_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  rating TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, title, year)
);

-- Enable Row Level Security
ALTER TABLE public.saved_content ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own saved content" 
ON public.saved_content 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save content" 
ON public.saved_content 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved content" 
ON public.saved_content 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_saved_content_user_id ON public.saved_content(user_id);