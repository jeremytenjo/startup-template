import { createClient } from '@supabase/supabase-js'

import supabaseConfig from '../supabase.config.js'

export default function getSupabaseClientServer() {
  // https://supabase.com/docs/reference/javascript/admin-api
  const supabaseClientServer = createClient(
    supabaseConfig.projectUrl,
    // KEEP PRIVATE
    process.env?.NODE_ENV === 'production'
      ? supabaseConfig.serviceRoleKey || ''
      : supabaseConfig.publicAnonKey || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )

  return {
    supabaseClientServer,
  }
}
