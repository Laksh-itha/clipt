import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code || code.length < 4) {
    return Response.json({ available: false, error: 'Code too short' })
  }

  if (!/^[a-zA-Z0-9]+$/.test(code)) {
    return Response.json({ available: false, error: 'Letters and numbers only' })
  }

  const { data } = await supabase
    .from('clips')
    .select('code')
    .ilike('code', code) 
    .single()

  return Response.json({ available: !data })
}