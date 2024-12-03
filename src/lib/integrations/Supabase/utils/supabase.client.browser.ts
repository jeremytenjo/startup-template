import { createClient } from '@supabase/supabase-js'

import supabaseConfig from '../supabase.config.js'

// https://supabase.com/docs/reference/javascript/eq
const supabaseClientBrowser = createClient(
  supabaseConfig.projectUrl,
  supabaseConfig.publicAnonKey,
)

export default supabaseClientBrowser
