
const chainDifference = {
  Cosmos: {
    firstLink: 'cosmos.lcd',
    secondLink: '',
    blockFirstLink: 'cosmos.rpc',
    blockSecondLink: '',
    unit: 'uatom',
    secondUnit: 'atom',
    unitDivision: 1000000,
    iconLink: 'atom.svg',
  },
  Injective: {
    firstLink: 'proxy',
    secondLink: '/inj-lcd',
    blockFirstLink: 'proxy',
    blockSecondLink: '/inj-rpc',
    unit: 'inj',
    secondUnit: 'inj',
    unitDivision: 1000000000000000000,
    iconLink: 'injective.svg',
  },
  Band: {
    firstLink: 'proxy',
    secondLink: '/band-lcd',
    blockFirstLink: 'proxy',
    blockSecondLink: '/band-prc',
    unit: 'uband',
    secondUnit: 'band',
    unitDivision: 10000000,
    iconLink: 'band.svg',
  },
  Juno: {
    firstLink: 'proxy',
    secondLink: '/juno-lcd',
    blockFirstLink: 'proxy',
    blockSecondLink: '/juno-rpc',
    unit: 'ujuno',
    secondUnit: 'juno',
    unitDivision: 1000000,
    iconLink: 'juno.svg',
  },
  Kava: {
    firstLink: 'proxy',
    secondLink: '/kava-lcd',
    blockFirstLink: 'proxy',
    blockSecondLink: '/kava-rpc',
    unit: 'ukava',
    secondUnit: 'kava',
    unitDivision: 1000000,
    iconLink: 'kava.png'
  }
} 


export default chainDifference