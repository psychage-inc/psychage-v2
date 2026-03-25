-- Create bookings table
-- Referenced by BookingModal.tsx

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    visit_type TEXT NOT NULL DEFAULT 'video' CHECK (visit_type IN ('video', 'in_person')),
    reason TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view own bookings"
    ON public.bookings FOR SELECT
    USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can cancel own bookings"
    ON public.bookings FOR UPDATE
    USING (auth.uid() = patient_id);

-- Providers can see bookings made for them
CREATE POLICY "Providers can view their bookings"
    ON public.bookings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.providers p
            WHERE p.id = provider_id AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Providers can update booking status"
    ON public.bookings FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.providers p
            WHERE p.id = provider_id AND p.user_id = auth.uid()
        )
    );

CREATE INDEX idx_bookings_patient ON public.bookings (patient_id);
CREATE INDEX idx_bookings_provider ON public.bookings (provider_id);
CREATE INDEX idx_bookings_status ON public.bookings (status);
CREATE INDEX idx_bookings_date ON public.bookings (booking_date DESC);

-- Create messages table
-- Referenced by MessagingModal.tsx

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
    ON public.messages FOR SELECT
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
    ON public.messages FOR INSERT
    WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can mark messages read"
    ON public.messages FOR UPDATE
    USING (auth.uid() = recipient_id);

CREATE INDEX idx_messages_sender ON public.messages (sender_id);
CREATE INDEX idx_messages_recipient ON public.messages (recipient_id);
CREATE INDEX idx_messages_provider ON public.messages (provider_id);
CREATE INDEX idx_messages_read ON public.messages (is_read) WHERE NOT is_read;
