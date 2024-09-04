import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuth } from '../../contexts/AuthProvider/useAuth'
import { convertErrorToString } from '../../utils/error-to-toast'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().default(false),
})

type SignInForm = z.infer<typeof signInForm>

interface SignInBody {
  email: string
  password: string
}

export function SignIn() {
  const [searchParms] = useSearchParams()
  const navigate = useNavigate()
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = useForm<SignInForm>({
    defaultValues: {
      email:
        searchParms.get('email') ??
        localStorage.getItem('task-manager-v1:user-email') ??
        '',
      password: searchParms.get('email')
        ? ''
        : localStorage.getItem('task-manager-v1:user-password') ?? '',
      rememberMe: searchParms.get('email')
        ? false
        : localStorage.getItem('task-manager-v1:remember-me') === 'true',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: async ({ email, password }: SignInBody) => {
      await auth.authenticate(email, password)
    },
  })

  async function handleSignIn({ email, password, rememberMe }: SignInForm) {
    try {
      await authenticate({ email, password })

      localStorage.setItem(
        'task-manager-v1:remember-me',
        rememberMe ? 'true' : 'false',
      )

      if (rememberMe) {
        localStorage.setItem('task-manager-v1:user-email', email)
        localStorage.setItem('task-manager-v1:user-password', password)
      } else {
        localStorage.removeItem('task-manager-v1:user-email')
        localStorage.removeItem('task-manager-v1:user-password')
      }

      navigate('/tasks')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Task.Manager</CardTitle>
          <CardDescription>
            Organize seu dia de uma forma simples e fácil
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <CardContent>
            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div>
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Button type="submit" disabled={isSubmitting}>
                Acessar
              </Button>

              <div className="flex flex-row gap-1 items-center">
                <Checkbox
                  className="w-6 h-6"
                  id="rememberMe"
                  defaultChecked={getValues('rememberMe')}
                  onCheckedChange={(checked: boolean) => {
                    setValue('rememberMe', checked)
                  }}
                />
                <Label htmlFor="rememberMe">Lembre-me</Label>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link to="/sign-up">Criar conta</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Loading isLoading={isSubmitting} />
    </>
  )
}
