interface Props {
  amount: number
}

export interface PaymePayload {
  action: string
  transaction: {
    currency: string
    amount: string
    meta: {
      internal_operation_number: string
      description: string
      additional_fields: {
        reserverd1: string
      }
    }
  }
  address: {
    billing: {
      first_name: string
      last_name: string
      email: string
      phone: {
        country_code: string
        subscriber: string
      }
      location: {
        line_1: string
        line_2: string
        city: string
        state: string
        country: string
        zip_code: string
      }
    }
    shipping: {
      first_name: string
      last_name: string
      email: string
      phone: {
        country_code: string
        subscriber: string
      }
      location: {
        line_1: string
        line_2: string
        city: string
        state: string
        country: string
        zip_code: string
      }
    }
  }
  card_holder: {
    first_name: string
    last_name: string
    email_address: string
    identity_document_country: string
    identity_document_type: string
    identity_document_identifier: string
  }[]
}

const formatAmount = (amount: number) => {
  return parseInt(amount.toString().replace('.', '').replace(',', '')) * 1000
}

export const payRequest = ({ amount }: Props): PaymePayload => ({
  action: 'authorize',
  transaction: {
    currency: '604',
    amount: String(formatAmount(amount)),
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
