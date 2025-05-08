import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	'https://fnaeijdumseiaoabvvmc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYWVpamR1bXNlaWFvYWJ2dm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0Njc5MDgsImV4cCI6MjA1MzA0MzkwOH0.AKnUpUDBfog2rDv9_jFwTXxNb_R5c9WtK2n0jn18bG4'
);
