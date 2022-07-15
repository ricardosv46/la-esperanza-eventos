interface IAsiento {
  fila: string
  columnas: number
  precio: number
}

export const genAsientos = (id: string) => {
  let data: IAsiento[] = []
  let nombreFilas: string[] = []
  let desabilitados: string[] = []
  if (id === '1') {
    data = [
      { fila: 'T1-F03-', columnas: 53, precio: 50 },
      { fila: 'T1-CB-', columnas: 48, precio: 100 },
      { fila: 'T1-B-', columnas: 46, precio: 150 }
    ]

    nombreFilas = ['F03', 'CONTRA BARRERA', 'BARRERA']

    desabilitados = [
      'T1-F03-10',
      'T1-F03-15',
      'T1-F03-20',
      'T1-CB-30',
      'T1-CB-35',
      'T1-CB-40',
      'T1-B-10',
      'T1-B-25',
      'T1-B-37',
      'T1-F03-40'
    ]
  }
  if (id === '2') {
    data = [
      { fila: 'T2S-F15-', columnas: 113, precio: 10 },
      { fila: 'T2S-F14-', columnas: 114, precio: 20 },
      { fila: 'T2S-F13-', columnas: 119, precio: 30 },
      { fila: 'T2S-F12-', columnas: 122, precio: 40 },
      { fila: 'T2S-F11-', columnas: 118, precio: 50 },
      { fila: 'T2S-F10-', columnas: 107, precio: 60 },
      { fila: 'T2S-F09-', columnas: 111, precio: 70 },
      { fila: 'T2S-F08-', columnas: 108, precio: 80 },
      { fila: 'T2S-F07-', columnas: 98, precio: 90 },
      { fila: 'T2S-F06-', columnas: 95, precio: 100 },
      { fila: 'T2S-F05-', columnas: 81, precio: 150 },
      { fila: 'T2S-F04-', columnas: 66, precio: 300 }
    ]

    nombreFilas = [
      'F15',
      'F14',
      'F13',
      'F12',
      'F11',
      'F10',
      'F09',
      'F08',
      'F07',
      'F06',
      'F05',
      'F04'
    ]

    desabilitados = [
      'T2S-F15-10',
      'T2S-F14-100',
      'T2S-F13-80',
      'T2S-F12-70',
      'T2S-F11-55',
      'T2S-F10-60',
      'T2S-F08-40',
      'T2S-F09-25',
      'T2S-F07-37',
      'T2S-F05-40'
    ]
  }

  if (id === '3') {
    data = [
      { fila: 'T2B-F03-', columnas: 66, precio: 50 },
      { fila: 'T2B-CB-', columnas: 60, precio: 100 },
      { fila: 'T2B-B-', columnas: 58, precio: 150 }
    ]

    nombreFilas = ['F03', 'CONTRA BARRERA', 'BARRERA']

    desabilitados = [
      'T2B-F03-10',
      'T2B-F03-15',
      'T2B-F03-20',
      'T2B-CB-30',
      'T2B-CB-35',
      'T2B-CB-40',
      'T2B-B-10',
      'T2B-B-25',
      'T2B-B-37',
      'T2B-F03-40'
    ]
  }
  if (id === '4') {
    data = [
      { fila: 'T3S-F17-', columnas: 92, precio: 50 },
      { fila: 'T3S-F16-', columnas: 90, precio: 100 },
      { fila: 'T3S-F15-', columnas: 84, precio: 150 },
      { fila: 'T3S-F14-', columnas: 83, precio: 50 },
      { fila: 'T3S-F13-', columnas: 81, precio: 100 },
      { fila: 'T3S-F12-', columnas: 80, precio: 150 },
      { fila: 'T3S-F11-', columnas: 75, precio: 150 },
      { fila: 'T3S-F10-', columnas: 75, precio: 50 },
      { fila: 'T3S-F09-', columnas: 73, precio: 100 },
      { fila: 'T3S-F08-', columnas: 70, precio: 150 },
      { fila: 'T3S-F07-', columnas: 59, precio: 150 },
      { fila: 'T3S-F06-', columnas: 57, precio: 150 },
      { fila: 'T3S-F05-', columnas: 55, precio: 150 },
      { fila: 'T3S-F04-', columnas: 53, precio: 150 }
    ]

    nombreFilas = [
      'F17',
      'F16',
      'F15',
      'F14',
      'F13',
      'F12',
      'F11',
      'F10',
      'F09',
      'F08',
      'F07',
      'F06',
      'F05',
      'F04'
    ]

    desabilitados = [
      'T3S-F15-10',
      'T3S-F14-90',
      'T3S-F13-80',
      'T3S-F12-70',
      'T3S-F11-55',
      'T3S-F10-60',
      'T3S-F08-40',
      'T3S-F09-25',
      'T3S-F07-37',
      'T3S-F05-40'
    ]
  }
  if (id === '5') {
    data = [
      { fila: 'T3AS-F03-', columnas: 53, precio: 50 },
      { fila: 'T3AS-CB-', columnas: 48, precio: 100 },
      { fila: 'T3AS-B-', columnas: 46, precio: 150 }
    ]

    nombreFilas = ['F03', 'CONTRA BARRERA', 'BARRERA']

    desabilitados = [
      'T3AS-F03-10',
      'T3AS-F03-15',
      'T3AS-F03-20',
      'T3AS-CB-30',
      'T3AS-CB-35',
      'T3AS-CB-40',
      'T3AS-B-10',
      'T3AS-B-25',
      'T3AS-B-37',
      'T3AS-F03-40'
    ]
  }
  if (id === '6') {
    data = [
      { fila: 'T3B-F03-', columnas: 53, precio: 50 },
      { fila: 'T3B-CB-', columnas: 48, precio: 100 },
      { fila: 'T3B-B-', columnas: 46, precio: 150 }
    ]

    nombreFilas = ['F03', 'CONTRA BARRERA', 'BARRERA']

    desabilitados = [
      'T3B-F03-10',
      'T3B-F03-15',
      'T3B-F03-20',
      'T3B-CB-30',
      'T3B-CB-35',
      'T3B-CB-40',
      'T3B-B-10',
      'T3B-B-25',
      'T3B-B-37',
      'T3B-F03-40'
    ]
  }

  return { data, nombreFilas, desabilitados }
}
