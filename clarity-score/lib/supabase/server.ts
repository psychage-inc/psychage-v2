import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../types';

export const createServer = () => {
    return createServerComponentClient<Database>({ cookies });
};
