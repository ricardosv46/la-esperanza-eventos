import { useGetAllEntradasUsuarioQuery } from '../generated/graphql'

// Obtenemos todas los abonos
export const useEntradasUsuario = (eventoId: number) => {
  const { data, loading, refetch } = useGetAllEntradasUsuarioQuery({
    fetchPolicy: 'network-only',
    variables: {
      eventoId
    }
  })

  const entradas = data?.GetAllEntradasUsuario ?? []

  return {
    loading,
    entradas,
    refetch
  }
}
