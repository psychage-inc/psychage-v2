import { supabase } from '../lib/supabaseClient';

export interface BookingData {
  patient_id: string;
  provider_id: string;
  booking_date: string;
  booking_time: string;
  visit_type: 'video' | 'in_person';
  reason?: string;
  notes?: string;
}

export interface Booking extends BookingData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export const bookingService = {
  async createBooking(data: BookingData): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({ ...data, status: 'pending' })
        .select()
        .single();

      if (error) {
        console.error('Booking creation failed:', error);
        return { success: false, error: 'Failed to create booking. Please try again.' };
      }

      return { success: true, booking: booking as Booking };
    } catch (error) {
      console.error('Booking creation failed:', error);
      return { success: false, error: 'Failed to create booking. Please try again.' };
    }
  },

  async getPatientBookings(userId: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('patient_id', userId)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      return (data ?? []) as Booking[];
    } catch {
      return [];
    }
  },

  async getProviderBookings(providerId: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('provider_id', providerId)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      return (data ?? []) as Booking[];
    } catch {
      return [];
    }
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        return { success: false, error: 'Failed to update booking status.' };
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to update booking status.' };
    }
  },
};
