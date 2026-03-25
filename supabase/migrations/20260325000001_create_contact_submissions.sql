-- Create contact_submissions table
-- Referenced by contactService.ts

CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'responded', 'archived')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact form (no auth required)
CREATE POLICY "Anyone can submit contact forms"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (true);

-- Only authenticated admins can view submissions
CREATE POLICY "Admins can view contact submissions"
    ON public.contact_submissions FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE INDEX idx_contact_submissions_status ON public.contact_submissions (status);
CREATE INDEX idx_contact_submissions_created ON public.contact_submissions (created_at DESC);
