import prismaClient from '../../prisma'

interface DateFilterProps {
    startDate: string
    endDate: string
    user: { userId: string }
}

class DateFilterPlanetsService {
    async execute({ startDate, endDate, user }: DateFilterProps) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        // Add end of day to include the entire end date
        end.setHours(23, 59, 59, 999)

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