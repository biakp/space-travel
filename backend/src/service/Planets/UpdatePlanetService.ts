import prismaClient from "../../prisma";

interface RegisteredPlanetProps { // Defining the properties for the registered planet
    title: string;
    story: string;
    visitedPlanet: string[];
    user: { userId: string };
    imageUrl: string;
    visitedDate: string;
}

type UpdatedPlanetProps = RegisteredPlanetProps & { id: string } // Extending the properties to include an id for the planet

class UpdatePlanetService { // Service to update a planet's details
    async execute({
        id,
        title,
        story,
        visitedPlanet,
        user,
        imageUrl,
        visitedDate,
    }: UpdatedPlanetProps) {
        const parsedVisitedDate = new Date(visitedDate); // Parsing the visited date to a Date object

        const registeredPlanet = await prismaClient.registeredPlanet.findFirst({ // Finding the registered planet by id and userId
            where: {
                id: id,
                userId: user.userId
            }
        })

        if (!registeredPlanet) {
            throw new Error("Register not found!")
        }

        const placeholderImageUrl = 'http://localhost:8000/uploads/bingusplanet.avif'; // Default image URL if none is provided

        const updatedregisteredPlanet = await prismaClient.registeredPlanet.update({ //
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
