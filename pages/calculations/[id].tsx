import React, {ChangeEvent} from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {fetchTariffs, FeeValue, ElectricityTariff, Tariffs} from '@features/tariffs'
import {Header, Footer} from '@features/layout'
import {useAuth} from '@features/auth'
import useSwr from 'swr'
import styles from '../../styles/Home.module.css'


const List: NextPage = () => {
  const router = useRouter()
  const auth = useAuth()
  const {data: tariffs} = useSwr('tariffs', () => fetchTariffs('moscow'))

  const [hotWaterPrev, setHotWaterPrev] = React.useState('')
  const [hotWaterCurrent, setHotWaterCurrent] = React.useState('488.13')
  const handleWaterPrevChange = (e: ChangeEvent<HTMLInputElement>) => setHotWaterPrev(e.target.value)
  const handleWaterCurrentChange = (e: ChangeEvent<HTMLInputElement>) => setHotWaterCurrent(e.target.value)

  const [coldWaterPrev, setColdWaterPrev] = React.useState('')
  const [coldWaterCurrent, setColdWaterCurrent] = React.useState('306.91')
  const handleColdWaterPrevChange = (e: ChangeEvent<HTMLInputElement>) => setColdWaterPrev(e.target.value)
  const handleColdWaterCurrentChange = (e: ChangeEvent<HTMLInputElement>) => setColdWaterCurrent(e.target.value)

  const [electricityT1Prev, setElectricityT1Prev] = React.useState('')
  const [electricityT1Current, setElectricityT1Current] = React.useState('3382.41')
  const handleElectricityT1PrevChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT1Prev(e.target.value)
  const handleElectricityT1CurrentChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT1Current(e.target.value)

  const [electricityT2Prev, setElectricityT2Prev] = React.useState('')
  const [electricityT2Current, setElectricityT2Current] = React.useState('2403.53')
  const handleElectricityT2PrevChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT2Prev(e.target.value)
  const handleElectricityT2CurrentChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT2Current(e.target.value)

  const [electricityT3Prev, setElectricityT3Prev] = React.useState('')
  const [electricityT3Current, setElectricityT3Current] = React.useState('9349.74')
  const handleElectricityT3PrevChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT3Prev(e.target.value)
  const handleElectricityT3CurrentChange = (e: ChangeEvent<HTMLInputElement>) => setElectricityT3Current(e.target.value)

  const cookerType = 'electricity'
  const electricityRateNumber = 3
  const fees = tariffs ? selectFees({cookerType, tariffs}) : null
  const total = fees ? calculateCommunal({
    hotWater: {
      previous: Number(hotWaterPrev),
      current: Number(hotWaterCurrent),
    },
    coldWater: {
      previous: Number(coldWaterPrev),
      current: Number(coldWaterCurrent),
    },
    electricity: {
      t1: {
        previous: Number(electricityT1Prev),
        current: Number(electricityT1Current),
      },
      t2: {
        previous: Number(electricityT2Prev),
        current: Number(electricityT2Current),
      },
      t3: {
        previous: Number(electricityT3Prev),
        current: Number(electricityT3Current),
      },
    }
  }, fees, electricityRateNumber) : null
  React.useEffect(() => {
    if (!auth || !auth.session) {
      router.push('/')
    }
  }, [auth, router])
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Hot Water</h2>
          <form action="" method="">
            <input type="text" placeholder="previous" value={hotWaterPrev} onChange={handleWaterPrevChange} />
            <input type="text" placeholder="current" value={hotWaterCurrent} onChange={handleWaterCurrentChange} />
          </form>
        </div>
        <div className={styles.card}>
          <h2>Cold Water</h2>
          <form action="" method="">
            <input type="text" placeholder="previous" value={coldWaterPrev} onChange={handleColdWaterPrevChange} />
            <input type="text" placeholder="current" value={coldWaterCurrent} onChange={handleColdWaterCurrentChange} />
          </form>
        </div>
        <div className={styles.card}>
          <h2>Electricity</h2>
          <form action="" method="">
            <p>
              <input type="text" placeholder="t1 previous" value={electricityT1Prev} onChange={handleElectricityT1PrevChange} />
              <input type="text" placeholder="t1 current" value={electricityT1Current} onChange={handleElectricityT1CurrentChange} />
            </p>
            <p>
              <input type="text" placeholder="t2 previous" value={electricityT2Prev} onChange={handleElectricityT2PrevChange} />
              <input type="text" placeholder="t2 current" value={electricityT2Current} onChange={handleElectricityT2CurrentChange} />
            </p>
            <p>
              <input type="text" placeholder="t3 previous" value={electricityT3Prev} onChange={handleElectricityT3PrevChange} />
              <input type="text" placeholder="t3 current" value={electricityT3Current} onChange={handleElectricityT3CurrentChange} />
            </p>
          </form>
        </div>

        <div className={`${styles.card} ${styles.total}`}>
          <h2>Total: {total}</h2>
        </div>
      </div>
    </>
  );
}

interface Values {
  previous: number,
  current: number
}

interface MeterReadings {
  hotWater: Values,
  coldWater: Values,
  electricity: {
    t1: Values,
    t2: Values,
    t3: Values,
  }
}

interface CalcTariffs {
  coldWater: FeeValue,
  hotWater: FeeValue,
  drainage: FeeValue,
  eletricity: ElectricityTariff
}

function calculateCommunal(meterReadings: MeterReadings, fees: CalcTariffs, electricityRateNumber: number): number {
  const hotWater = meterReadings.hotWater.current - meterReadings.hotWater.previous
  const hotWaterTotal = hotWater * fees.hotWater

  const coldWater = meterReadings.coldWater.current - meterReadings.coldWater.previous
  const coldWaterTotal = coldWater * fees.coldWater

  const drainage = (coldWater + hotWater) * fees.drainage

  let electricityTotal = 0
  if (electricityRateNumber === 1) {

  } else if (electricityRateNumber === 2) {

  } else if (electricityRateNumber === 3) {
    const fee = fees.eletricity.fee3
    const electricityT1 = meterReadings.electricity.t1.current - meterReadings.electricity.t1.previous
    const electricityT2 = meterReadings.electricity.t2.current - meterReadings.electricity.t2.previous
    const electricityT3 = meterReadings.electricity.t3.current - meterReadings.electricity.t3.previous
    electricityTotal = electricityT1 * fee.t1 + electricityT2 * fee.t2 + electricityT3 * fee.t3
  }

  return Math.round(hotWaterTotal + coldWaterTotal + drainage + electricityTotal)
}

function selectFees({cookerType, tariffs}: {cookerType: 'gas' | 'electricity', tariffs: Tariffs}) {
  const {fees} = tariffs
  const {gasCooker, electricCooker, ...restFees} = fees
  return {
    ...restFees,
    eletricity: cookerType === 'gas' ? gasCooker : electricCooker
  }
}

export default List
