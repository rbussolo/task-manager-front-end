import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getProfile } from '@/api/get-profile'
import { updateUser } from '@/api/update-user'
import { updateUserPhoto } from '@/api/update-user-photo'
import logo from '@/assets/user_no_image.png'
import { convertErrorToString } from '@/utils/error-to-toast'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

const userProfileForm = z.object({
  name: z.string(),
  email: z.string().email(),
  userImage: z.string(),
  file: z.instanceof(File),
})

type UserProfileForm = z.infer<typeof userProfileForm>

export function UserProfile() {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { mutateAsync: updateUserFn } = useMutation({
    mutationFn: updateUser,
  })

  const { mutateAsync: updateUserPhotoFn } = useMutation({
    mutationFn: updateUserPhoto,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<UserProfileForm>()

  async function handleEdit(data: UserProfileForm) {
    try {
      await updateUserFn({
        name: data.name,
        email: data.email,
      })

      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      userImage: user?.urlImage ?? logo,
    })
  }, [user, reset])

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]

    if (file.type !== 'image/png') {
      toast.error('Arquivo selecionado deve ser uma imagem PNG.')

      return
    } else if (file.size > 1024 * 512) {
      toast.error('O arquivo não pode ter tamanho maior que 512KB.')

      return
    }

    const userImage = URL.createObjectURL(file)

    setValue('userImage', userImage)
    setValue('file', file)

    try {
      await updateUserPhotoFn({
        file,
      })

      toast.success('Foto atualizada com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  function handleChangeFile() {
    inputFileRef.current?.click()
  }

  const image = watch('userImage') ?? logo

  return (
    <>
      <Card className="w-full lg:w-[500px]">
        <CardHeader className="pb-2">
          <CardTitle>Dados pessoal</CardTitle>
          <CardDescription>Altere seus dados aqui =D</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="flex flex-col-reverse gap-4 md:flex-row">
              <div className="flex flex-col gap-2 flex-1">
                <div>
                  <Label htmlFor="name">Seu nome</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register('name')}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Seu e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={isLoading}
                  />
                </div>

                <Button className="mt-3" disabled={isSubmitting} type="submit">
                  Salvar Alterações
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <img
                  src={image}
                  alt="user"
                  className="rounded-full w-[148px] h-[148px] border bg-white"
                />

                <input
                  className="hidden"
                  ref={inputFileRef}
                  type="file"
                  onChangeCapture={onFileChange}
                />

                <Button
                  onClick={handleChangeFile}
                  type="button"
                  className="w-full"
                >
                  Trocar Foto
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
