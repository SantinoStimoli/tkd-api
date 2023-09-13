import cors from 'cors'
import { ACCEPTED_ORIGINS } from '../global/global.js'

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
