interface Props {
  amount: string
}

export const payRequest = ({ amount }: Props) => ({
  action: 'authorize',
  transaction: {
    currency: '604',
    amount: amount,
    meta: {
      internal_operation_number: Math.floor(Date.now()).toString().substring(7),
      description: 'Descripcion de la transaccion',
      additional_fields: {
        reserverd1: 'Prueba valor reservado 1'
      }
    }
  },
  address: {
    billing: {
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'jperez@gmail.com',
      phone: {
        country_code: '51',
        subscriber: '987654321'
      },
      location: {
        line_1: 'Mi casa',
        line_2: 'Mi casa',
        city: 'LIMA',
        state: 'LIMA',
        country: 'PE',
        zip_code: '18'
      }
    },
    shipping: {
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'jperez@gmail.com',
      phone: {
        country_code: '51',
        subscriber: '987654321'
      },
      location: {
        line_1: 'Mi casa',
        line_2: 'Mi casa',
        city: 'LIMA',
        state: 'LIMA',
        country: 'PE',
        zip_code: '18'
      }
    }
  },
  card_holder: [
    {
      first_name: 'Juan',
      last_name: 'Perez',
      email_address: 'jperez@gmail.com',
      identity_document_country: 'PE',
      identity_document_type: 'DNI',
      identity_document_identifier: '87654321'
    }
  ]
})
