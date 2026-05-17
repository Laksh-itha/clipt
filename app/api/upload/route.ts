import { supabaseAdmin } from '@/lib/supabase'
import { uploadFile } from '@/lib/storage'
import { NextRequest } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const code = formData.get('code') as string
    const type = formData.get('type') as string
    const label = formData.get('label') as string
    const expiry = formData.get('expiry') as string

    if (!code || !type) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data: existing } = await supabaseAdmin
      .from('clips')
      .select('code')
      .eq('code', code)
      .single()

    if (existing) {
      return Response.json({ error: 'Code already taken' }, { status: 409 })
    }

    let expires_at = null
    if (expiry === '1h') expires_at = new Date(Date.now() + 3600000).toISOString()
    if (expiry === '1d') expires_at = new Date(Date.now() + 86400000).toISOString()
    if (expiry === '1w') expires_at = new Date(Date.now() + 604800000).toISOString()

    let file_url = null
    let content = null
    let language = null

    if (type === 'text' || type === 'code') {
      content = formData.get('content') as string
      language = formData.get('language') as string
    } else {
      const file = formData.get('file') as File
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${nanoid()}-${file.name}`
      file_url = await uploadFile(buffer, fileName, file.type)
    }

    const { error } = await supabaseAdmin.from('clips').insert({
      code,
      type,
      file_url,
      content,
      label,
      expires_at,
      language,
    })

    if (error) throw error

    return Response.json({ success: true, code })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}