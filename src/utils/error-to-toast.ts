import { AxiosError } from 'axios'

export function convertErrorToString(error: unknown): string {
  console.log(error)

  if (typeof error === 'string') {
    return error
  }

  if (error instanceof AxiosError) {
    if (typeof error.response?.data.message === 'string') {
      if (error.response.data.extra) {
        const erros = error.response.data.extra.reduce(
          (acc: string, cur: string) => acc + cur + ', ',
          '',
        )

        return error.response?.data.message + '<br />' + erros
      }

      return error.response?.data.message
    }

    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro.'
}
