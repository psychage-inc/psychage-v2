-- Create provider_favorites table
-- Referenced by providerService.ts

CREATE TABLE IF NOT EXISTS public.provider_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, provider_id)
);

ALTER TABLE public.provider_favorites ENABLE ROW LEVEL SECURITY;

-- Users can manage their own favorites
CREATE POLICY "Users can view own favorites"
    ON public.provider_favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
    ON public.provider_favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own favorites"
    ON public.provider_favorites FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX idx_provider_favorites_user ON public.provider_favorites (user_id);
CREATE INDEX idx_provider_favorites_provider ON public.provider_favorites (provider_id);
