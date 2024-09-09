import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getProfile } from '@/api/get-profile'
import logo from '@/assets/user_no_image.png'

import { Button } from './ui/button'
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserProfileForm>()

  function handleEdit(data: UserProfileForm) {
    console.log(data)
  }

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      userImage: user?.urlImage ?? logo,
    })
  }, [user, reset])

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files)
  }

  function handleChangeFile() {
    inputFileRef.current?.click()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex flex-col gap-2 min-w-80">
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
              src={logo}
              alt="user"
              className="rounded-full w-[148px] h-[148px] border bg-white"
            />

            <input
              className="hidden"
              ref={inputFileRef}
              type="file"
              onChangeCapture={onFileChange}
            />

            <Button onClick={handleChangeFile} type="button" className="w-full">
              Trocar Foto
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
