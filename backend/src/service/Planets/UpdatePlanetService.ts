import prismaClient from "../../prisma";

interface RegisteredPlanetProps {
    title: string;
    story: string;
    visitedPlanet: string[];
    user: { userId: string };
    imageUrl: string;
    visitedDate: string;
}

type UpdatedPlanetProps = RegisteredPlanetProps & { id: string }

class UpdatePlanetService {
    async execute({
        id,
        title,
        story,
        visitedPlanet,
        user,
        imageUrl,
        visitedDate,
    }: UpdatedPlanetProps) {
        const parsedVisitedDate = new Date(visitedDate);

        const registeredPlanet = await prismaClient.registeredPlanet.findFirst({
            where: {
                id: id,
                userId: user.userId
            }
        })

        if (!registeredPlanet) {
            throw new Error("Register not found!")
        }

        const placeholderImageUrl = 'http://localhost:8000/uploads/bingusplanet.avif'; // Default image URL if none is provided

        const updatedregisteredPlanet = await prismaClient.registeredPlanet.update({
            where: {
                id: id
            },
            data: {
                title: title,
                story: story,
                visitedPlanet: visitedPlanet,
                imageUrl: imageUrl || placeholderImageUrl,
                visitedDate: parsedVisitedDate
            },
        });

        return {
            error: false,
            updatedregisteredPlanet,
            message: "Planet updated successfully.",
        };
    }
}

export { UpdatePlanetService };
