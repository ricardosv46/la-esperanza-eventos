import { useGetAllButacasQuery } from '../generated/graphql'

// Obtenemos todas los abonos
export const useButacasAbonado = (tendido: string) => {
  const { data, loading, refetch } = useGetAllButacasQuery({
    fetchPolicy: 'network-only',
    variables: {
      tendido
    }
  })

  const butacas = data?.GetAllButacas?.data ?? []

  return {
    loading,
    butacas,
    refetch
  }
}
