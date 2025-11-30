const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

try {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing environment variables');
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
} catch (error) {
    console.error('Error initializing Supabase:', error.message);
}
