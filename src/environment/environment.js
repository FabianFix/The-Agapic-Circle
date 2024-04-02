import { createClient } from '@supabase/supabase-js'

export const environment = {
    supabaseClient: createClient("https://gxjhbtokcirnnaxkjugl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4amhidG9rY2lybm5heGtqdWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwODQ4NjEsImV4cCI6MjAyNzY2MDg2MX0.kEpZgxQfmIhuQVQxfy8YWsRtcSG6mVfFlPKUZqFSg2c")
}