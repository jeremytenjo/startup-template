// run npx supabase start to check local supabase instance info

const projectId = ''

const projectUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:54321'
    : `https://${projectId}.supabase.co`

const publicAnonKey =
  process.env.NODE_ENV === 'development'
    ? process.env.SUPABASE_PUBLISHABLE_KEY_DEVELOPMENT
    : process.env.SUPABASE_PUBLISHABLE_KEY_PRODUCTION

// KEEP PRIVATE
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY

const supabaseConfig = {
  projectId,
  projectUrl,
  publicAnonKey,
  serviceRoleKey,
  typesFilePath: 'src/lib/integrations/Supabase/types/supabase.database.types.ts',
}

export default supabaseConfig
