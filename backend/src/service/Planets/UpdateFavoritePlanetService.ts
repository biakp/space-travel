import prismaClient from '../../prisma'

interface UpdatePlanetProps {
    id: string
    user: { userId: string }
    isFavorite: boolean
}

class UpdateFavoritePlanetService {
    async execute({ id, user, isFavorite }: UpdatePlanetProps) {

        const registeredPlanet = await prismaClient.registeredPlanet.findFirst({
            where: {
                id: id,
                userId: user.userId
            }
        })

        if (!registeredPlanet) {
            throw new Error("Register planet not found")
        }

        const favoriteUpdate = await prismaClient.registeredPlanet.update({
            where: {
                id: id,
            },
            data: {
                isFavorite: isFavorite
            }
        })

        return favoriteUpdate
    }
}
export { UpdateFavoritePlanetService }