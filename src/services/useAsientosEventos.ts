import { useGetAllAsientosQuery } from '../generated/graphql'

// Obtenemos todas los abonos
export const useAsientosEventos = (input = { eventoId: 1, tendido: 'T1' }) => {
	const { data, loading, refetch } = useGetAllAsientosQuery({
		fetchPolicy: 'network-only',
		pollInterval: 1000,
		variables: {
			...input
		}
	})

	const asientos = data?.GetAllAsientos ?? []

	return {
		loading,
		asientos,
		refetch
	}
}
