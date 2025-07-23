import { FastifyReply, FastifyRequest } from "fastify";
import { UpdatePlanetService } from "../../service/Planets/UpdatePlanetService";
import { updatePlanetSchema, planetParamsSchema } from "../../schemas/generate.schema";

class UpdatePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Zod validation for request parameters and body
            // This will throw an error if validation fails
            const { id } = planetParamsSchema.parse(request.params);
            const { title, story, visitedPlanet, imageUrl, visitedDate } = updatePlanetSchema.parse(request.body);

            const { userId } = request.user as { userId: string };

            const updatePlanetService = new UpdatePlanetService();

            const planet = await updatePlanetService.execute({
                id,
                title,
                story,
                visitedPlanet,
                user: { userId },
                imageUrl: imageUrl ?? "",
                visitedDate,
            });

            return reply.send(planet);
        } catch (error: unknown) {

            console.error("Error updating planet:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { UpdatePlanetController };
