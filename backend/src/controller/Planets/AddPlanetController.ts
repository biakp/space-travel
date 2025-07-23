import { FastifyReply, FastifyRequest } from "fastify";
import { AddPlanetService } from "../../service/Planets/AddPlanetService";
import { addPlanetSchema } from "../../schemas/generate.schema";

class AddPlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { title, story, visitedPlanet, imageUrl, visitedDate } = addPlanetSchema.parse(request.body);
            const { userId } = request.user as { userId: string };

            const addPlanetService = new AddPlanetService();

            const planet = await addPlanetService.execute({
                title,
                story,
                visitedPlanet,
                user: { userId },
                imageUrl: imageUrl ?? "",
                visitedDate,
            });

            return reply.send(planet);
        } catch (error: unknown) {
            console.error("Error adding planet:", error);

            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { AddPlanetController };
