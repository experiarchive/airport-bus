import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

let supabaseClient;

try {
    // Basic validation to prevent crash if user pasted invalid URL
    if (!supabaseUrl.startsWith('http')) {
        throw new Error('Invalid Supabase URL');
    }
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
    console.warn('Supabase initialization failed, using placeholder:', error);
    supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder');
}

export const supabase = supabaseClient;
