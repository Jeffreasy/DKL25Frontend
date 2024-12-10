import React, { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient' // Zorg dat dit pad klopt met jouw projectstructuur

const TestSupabase: React.FC = () => {
  useEffect(() => {
    console.log('Test: Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('Test: Supabase ANON KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY)

    const testConnection = async () => {
      const { data, error } = await supabase.from('partners').select('*')
      if (error) {
        console.error('Test: Error fetching partners:', error)
      } else {
        console.log('Test: Fetched partners:', data)
      }
    }

    testConnection()
  }, [])

  return (
    <div>
      <h1>Test Supabase Connection</h1>
      <p>Kijk in de console voor output.</p>
    </div>
  )
}

export default TestSupabase
