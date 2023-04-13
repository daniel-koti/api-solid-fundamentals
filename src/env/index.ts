import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

// Valida se o process.env tem o mesmo formato de envSchema {}
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variables ❌', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
