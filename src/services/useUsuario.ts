import { useCreateUsuarioMutation } from '../generated/graphql'

interface ICreate {
  email: string
  password: string
  nombres: string
  apellidos: string
}

// Obtenemos todas las categorias
export const useUsuario = () => {
  const [CreateUsuario, { loading: loadingCreate }] = useCreateUsuarioMutation()

  const createUsuario = async ({ email, password, nombres, apellidos }: ICreate) => {
    try {
      const res = await CreateUsuario({
        variables: {
          input: {
            tipoDocumento: '',
            numeroDocumento: '',
            celular: '',
            email,
            password,
            nombres,
            apellidos
          }
        }
      })
      return { ok: true }
    } catch (error: any) {
      console.log(error?.graphQLErrors[0]?.debugMessage)
      return { ok: false, error: error?.graphQLErrors[0]?.debugMessage }
    }
  }

  return {
    createUsuario,
    loadingCreate
  }
}
