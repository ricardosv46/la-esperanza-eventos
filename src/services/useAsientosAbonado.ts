import { useGetAllAsientosAbonadosQuery, useGetAllButacasQuery } from '../generated/graphql'

// Obtenemos todas los abonos
export const useAsientosAbonado = (input = { feriaId: 1, tendido: 'T1' }) => {
  const { data, loading, refetch } = useGetAllAsientosAbonadosQuery({
    fetchPolicy: 'network-only',
    variables: {
      ...input
    }
  })

  const asientos = data?.GetAllAsientosAbonados ?? []

  return {
    loading,
    asientos,
    refetch
  }
}
