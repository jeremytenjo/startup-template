// run npx supabase start to check local supabase instance info

const projectId = 'zcmzqtlhvlvwctihjqde'

const projectUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:54321'
    : `https://${projectId}.supabase.co`

const publicAnonKey =
  process.env.NODE_ENV === 'development'
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbXpxdGxodmx2d2N0aWhqcWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwODMwNjIsImV4cCI6MjAxMDY1OTA2Mn0.KpH3zXVfN52C8R37cToSt3zRXOT6_j-kVnreY6vODCw`

// KEEP PRIVATE
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseConfig = {
  projectId,
  projectUrl,
  publicAnonKey,
  serviceRoleKey,
  typesFilePath: 'src/lib/integrations/Supabase/types/supabase.database.types.ts',
}

export default supabaseConfig
