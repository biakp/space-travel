import prismaClient from '../../prisma'

interface DateFilterProps {
    startDate: string
    endDate: string
    user: { userId: string }
}

class DateFilterPlanetsService {
    async execute({ startDate, endDate, user }: DateFilterProps) {
        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

        return await prismaClient.registeredPlanet.findMany({
            where: {
                userId: user.userId,
                visitedDate: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: {
                isFavorite: 'desc'
            }
        })
    }
}
export { DateFilterPlanetsService }