import { api } from '@/lib/api'

export interface UpdateUserPhotoBody {
  file: File
}

export async function updateUserPhoto({ file }: UpdateUserPhotoBody) {
  const formData = new FormData()
  formData.append('file', file)

  await api.patchForm('/users/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
