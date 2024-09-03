import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { convertErrorToString } from '@/utils/error-to-toast'

const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('Conta criada com sucesso!', {
        action: {
          label: 'Logar',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Task.Manager</CardTitle>
          <CardDescription>
            Crie sua conta e comece a organizar sua vida
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <CardContent>
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div>
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              <Button disabled={isSubmitting} type="submit">
                Finalizar cadastro
              </Button>

              <Button variant="outline" asChild>
                <Link to="/sign-in">Já possuo conta</Link>
              </Button>
            </div>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground mt-1 mb-2">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                Políticas de privacidade
              </a>
              .
            </p>
          </CardFooter>
        </form>
      </Card>

      <Loading isLoading={isSubmitting} />
    </>
  )
}
