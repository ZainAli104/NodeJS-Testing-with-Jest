import {mockDeep} from 'vitest-mock-extended'

import {PrismaClient} from '../generated/prisma'

export const prismadb = mockDeep<PrismaClient>()
