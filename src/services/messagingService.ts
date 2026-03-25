import { supabase } from '../lib/supabaseClient';

export interface MessageData {
  sender_id: string;
  recipient_id?: string;
  provider_id?: string;
  subject: string;
  body: string;
  is_urgent?: boolean;
}

export interface Message extends MessageData {
  id: string;
  is_read: boolean;
  created_at: string;
}

export const messagingService = {
  async sendMessage(data: MessageData): Promise<{ success: boolean; message?: Message; error?: string }> {
    try {
      const { data: message, error } = await supabase
        .from('messages')
        .insert({ ...data, is_read: false })
        .select()
        .single();

      if (error) {
        console.error('Message send failed:', error);
        return { success: false, error: 'Failed to send message. Please try again.' };
      }

      return { success: true, message: message as Message };
    } catch (error) {
      console.error('Message send failed:', error);
      return { success: false, error: 'Failed to send message. Please try again.' };
    }
  },

  async getMessages(userId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as Message[];
    } catch {
      return [];
    }
  },

  async markAsRead(id: string): Promise<void> {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);
    } catch {
      // silently ignore
    }
  },

  async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', userId)
        .eq('is_read', false);

      if (error) return 0;
      return count ?? 0;
    } catch {
      return 0;
    }
  },
};
