import { createClient } from '@supabase/supabase-js'

import supabaseConfig from '../supabase.config.js'

if (!supabaseConfig.projectUrl) {
  throw new Error('supabaseConfig.projectUrl is undefined')
}

if (!supabaseConfig.publicAnonKey) {
  throw new Error('supabaseConfig.publicAnonKey is undefined')
}

// https://supabase.com/docs/reference/javascript/eq
const supabaseClientBrowser = createClient(
  supabaseConfig.projectUrl,
  supabaseConfig.publicAnonKey,
)

export default supabaseClientBrowser
