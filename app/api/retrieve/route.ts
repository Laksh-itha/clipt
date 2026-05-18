import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return Response.json({ error: 'No code provided' }, { status: 400 })
  }

  const { data: clip, error } = await supabase
    .from('clips')
    .select('*')
    .ilike('code', code)   // ← changed from .eq to .ilike (case-insensitive)
    .single()

  if (error || !clip) {
    return Response.json({ error: 'Clip not found' }, { status: 404 })
  }

  if (clip.expires_at && new Date(clip.expires_at) < new Date()) {
    return Response.json({ error: 'Clip has expired' }, { status: 410 })
  }

  await supabase
    .from('clips')
    .update({ view_count: clip.view_count + 1 })
    .eq('code', clip.code)

  return Response.json({ clip })
}