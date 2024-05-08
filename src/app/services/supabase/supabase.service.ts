import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly supabase: SupabaseClient;

  constructor() {
    // Create a single supabase client for interacting with your database
    // this.supabase = createClient(supabaseConfig.projectUrl, supabaseConfig.apiKey);
    this.supabase = createClient(import.meta.env['NG_APP_SUPABASE_PROJECT_URL'], import.meta.env['NG_APP_SUPABASE_API_KEY']);
  }
}
