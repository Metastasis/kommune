// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

const tariffs = [
  {
    country: 'russia',
    city: 'moscow',
    fees: {
      coldWater: 43.57,
      hotWater: 211.67,
      drainage: 32.02,
      gasCooker: {
        fee1: {
          t1: 5.92
        },
        fee2: {
          t1: 6.81,
          t2: 2.48
        },
        fee3: {
          t1: 7.10,
          t2: 5.92,
          t3: 2.48
        }
      },
      electricCooker: {
        fee1: {
          t1: 5.15
        },
        fee2: {
          t1: 5.92,
          t2: 1.74
        },
        fee3: {
          t1: 6.18,
          t2: 5.15,
          t3: 1.74
        }
      }
    }
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {city} = req.body
  const tariff = tariffs.find(t => t.city === city) || null
  res.status(200).json(tariff)
}
