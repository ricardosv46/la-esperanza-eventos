import {
  useCreatePedidoAbonadoMutation,
  useCreatePedidoMutation,
  useUpdateAsignacionEntradaMutation
} from '../generated/graphql'

interface IUpdateAsiento {
  asientoId: string
  tipoDocumento: string
  numDocumento: string
  nombres: string
  apellidos: string
}

export const useUpdateAsignacionEntrada = () => {
  const [UpdateAsignacionEntrada, { loading: loadingUpdate }] = useUpdateAsignacionEntradaMutation()

  const updateAsignacionEntrada = async ({
    asientoId,
    tipoDocumento,
    numDocumento,
    nombres,
    apellidos
  }: IUpdateAsiento) => {
    try {
      const res = await UpdateAsignacionEntrada({
        variables: {
          input: {
            asientoId,
            tipoDocumento,
            numDocumento,
            nombres,
            apellidos
          }
        }
      })
      console.log(res)
      return { ok: true }
    } catch (error: any) {
      console.log(error?.graphQLErrors[0])
      return { ok: false, error: error?.graphQLErrors[0]?.debugMessage }
    }
  }

  return {
    updateAsignacionEntrada,
    loadingUpdate
  }
}
