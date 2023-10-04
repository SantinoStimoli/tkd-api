const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'tkd_db'
}

export const ACCEPTED_ORIGINS = ['*']

// export const CONFIG = process.env.DATABASE_URL ?? DEFAULT_CONFIG
export const CONFIG = DEFAULT_CONFIG
