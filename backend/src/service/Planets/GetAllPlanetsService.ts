import prismaClient from "../../prisma";

interface RegisteredPlanetProps {
    user: {
        userId: string;
    };
}

class GetAllPlanetsService {
    async execute({ user }: RegisteredPlanetProps) {
        const registeredPlanets = await prismaClient.registeredPlanet.findMany({ // Fetch all planets registered by the user
            where: {
                userId: user.userId
            },
            orderBy: { isFavorite: 'desc' }
        });

        return registeredPlanets
    }
}
export { GetAllPlanetsService };
