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
