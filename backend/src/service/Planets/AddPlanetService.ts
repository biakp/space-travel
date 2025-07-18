import prismaClient from "../../prisma";

interface RegisteredPlanetProps {
    title: string;
    story: string;
    visitedPlanet: string[];
    user: { userId: string };
    imageUrl: string;
    visitedDate: string;
}

class AddPlanetService {
    async execute({
        title,
        story,
        visitedPlanet,
        user,
        imageUrl,
        visitedDate,
    }: RegisteredPlanetProps) {
        const parsedVisitedDate = new Date(visitedDate);

        const placeholderImageUrl = 'http://localhost:8000/uploads/bingusplanet.avif'; // Default image URL if none is provided

        const registeredPlanet = await prismaClient.registeredPlanet.create({
            data: {
                title,
                story,
                visitedPlanet,
                userId: user.userId,
                imageUrl: imageUrl || placeholderImageUrl,
                visitedDate: parsedVisitedDate,
            },
        });

        return {
            error: false,
            registeredPlanet: {
                id: registeredPlanet.id,
                title: registeredPlanet.title,
                story: registeredPlanet.story,
                visitedPlanet: registeredPlanet.visitedPlanet,
                userId: registeredPlanet.userId,
                imageUrl: registeredPlanet.imageUrl,
                visitedDate: registeredPlanet.visitedDate,
            },
            message: "Planet created successfully.",
        };
    }
}

export { AddPlanetService };
