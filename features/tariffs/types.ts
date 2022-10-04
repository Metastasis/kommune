export type FeeValue = number

export interface ElectricityTariff {
  fee1: {
    t1: FeeValue
  },
  fee2: {
    t1: FeeValue,
    t2: FeeValue
  },
  fee3: {
    t1: FeeValue,
    t2: FeeValue,
    t3: FeeValue
  }
}

export interface Tariffs {
  country: string,
  city: string,
  fees: {
    coldWater: FeeValue,
    hotWater: FeeValue,
    drainage: FeeValue,
    gasCooker: ElectricityTariff,
    electricCooker: ElectricityTariff,
  }
}

export interface TariffByLocation {
  id: string,
  serviceId: string,
  title: string,
  location: {
    country: string,
    city: string,
  },
  tax: {
    value: number,
    type: 'differenceBetweenCurrentAndPrevious'
  } | {
    price: number,
    type: 'fixedValue'
  } | {
    value: number,
    type: 'valueDependsOnFlatSquare'
  }
}
