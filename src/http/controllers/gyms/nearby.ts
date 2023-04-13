import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-use-case'

export async function fetchNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGyms = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
