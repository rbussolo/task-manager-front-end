import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateUserPassword } from '@/api/update-user-password'
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

const userPasswordForm = z.object({
  newPassword: z.string().min(6),
  newPasswordAgain: z.string().min(6),
})

type UserPasswordForm = z.infer<typeof userPasswordForm>

export function UserPassword() {
  const { mutateAsync: updateUserPasswordFn } = useMutation({
    mutationFn: updateUserPassword,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserPasswordForm>()

  async function handleEdit(data: UserPasswordForm) {
    try {
      if (data.newPassword !== data.newPasswordAgain) {
        throw new Error('As duas senhas informadas devem ser iguais!')
      }

      await updateUserPasswordFn({
        password: data.newPassword,
      })

      toast.success('Senha atualizada com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  return (
    <>
      <Card className="w-full lg:w-[300px]">
        <CardHeader className="pb-2">
          <CardTitle>Sua senha</CardTitle>
          <CardDescription>Altera sua senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="flex flex-col-reverse gap-4 md:flex-row">
              <div className="flex flex-col gap-2 flex-1">
                <div>
                  <Label htmlFor="name">Nova senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...register('newPassword')}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Seu e-mail</Label>
                  <Input
                    id="newPasswordAgain"
                    type="password"
                    {...register('newPasswordAgain')}
                    disabled={isSubmitting}
                  />
                </div>

                <Button className="mt-3" disabled={isSubmitting} type="submit">
                  Alterar senha
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
