import prismaClient from "../../prisma";

interface SearchPlanetProps {
    user: { userId: string } | undefined
    query: string;
}

class SearchPlanetsService {
    async execute({ user, query }: SearchPlanetProps) {
        const searchedPlanets = await prismaClient.registeredPlanet.findMany({
            where: {
                userId: user?.userId,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { story: { contains: query, mode: 'insensitive' } },
                    { visitedPlanet: { hasSome: [query] } }
                ]
            },
            orderBy: {
                isFavorite: 'desc'
            }
        });

        return searchedPlanets;
    }
}

export { SearchPlanetsService };