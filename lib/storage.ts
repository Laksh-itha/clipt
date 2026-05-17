import { supabaseAdmin } from './supabase'

const BUCKET = 'clipt-files'

export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, file, {
      contentType,
      upsert: false,
    })

  if (error) throw new Error(error.message)

  const { data } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function deleteFile(fileName: string) {
  await supabaseAdmin.storage
    .from(BUCKET)
    .remove([fileName])
}