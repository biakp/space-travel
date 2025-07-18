import { FastifyReply, FastifyRequest } from "fastify";
import { AddPlanetService } from "../../service/Planets/AddPlanetService";

interface RegisteredPlanet {
    title: string;
    story: string;
    visitedPlanet: string[];
    imageUrl: string;
    visitedDate: string;
}

class AddPlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { title, story, visitedPlanet, imageUrl, visitedDate } =
            request.body as RegisteredPlanet;
        const { user } = request; // Extract the user from the request

        if (!title || !story || !visitedPlanet || !visitedDate) {
            reply.status(400).send({ message: "All fields are required" });
        }

        if (!user) {
            return reply.status(400).send({ error: true, message: "User does not exists!" })
        }

        try {
            const addPlanetService = new AddPlanetService(); // Instantiate the service to handle adding a planet
            const registeredPlanet = await addPlanetService.execute({
                title,
                story,
                visitedPlanet,
                user,
                imageUrl,
                visitedDate,
            });

            reply.status(201).send(registeredPlanet); // Send the created planet as a response
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message }); // Handle errors during planet addition
        }
    }
}
export { AddPlanetController };
