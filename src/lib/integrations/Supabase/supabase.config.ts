// run npx supabase start to check local supabase instance info

const projectId = ''

const projectUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:54321'
    : `https://${projectId}.supabase.co`

const publicAnonKey_DEV = ''
const publicAnonKey_PROD = ''

const publicAnonKey =
  process.env.NODE_ENV === 'development' ? publicAnonKey_DEV : publicAnonKey_PROD

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
