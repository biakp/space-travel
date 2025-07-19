import { FastifyReply, FastifyRequest } from "fastify";
import { UpdatePlanetService } from "../../service/Planets/UpdatePlanetService";

interface UpdatedPlanet {
    title: string;
    story: string;
    visitedPlanet: string[];
    imageUrl: string;
    visitedDate: string;
}

class UpdatePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const { title, story, visitedPlanet, imageUrl, visitedDate } =
            request.body as UpdatedPlanet;
        const { user } = request; // Extract the user from the request

        if (!title || !story || !visitedPlanet || !visitedDate) {
            reply.status(400).send({ message: "All fields are required" });
        }

        if (!user) {
            return reply.status(400).send({ error: true, message: "User does not exists!" })
        }

        try {
            const updatePlanetService = new UpdatePlanetService(); // Instantiate the service to handle updating a planet
            const updatedPlanet = await updatePlanetService.execute({
                id, imageUrl, story, title, user, visitedDate, visitedPlanet
            });

            reply.status(201).send(updatedPlanet); // Send the updated planet as a response
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message }); // Handle errors during planet update
        }
    }
}
export { UpdatePlanetController };
