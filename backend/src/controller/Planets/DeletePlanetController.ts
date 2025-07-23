import { FastifyReply, FastifyRequest } from "fastify";
import { DeletePlanetService } from "../../service/Planets/DeletePlanetService";
import { planetParamsSchema } from "../../schemas/generate.schema";

class DeletePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = planetParamsSchema.parse(request.params);

            const { userId } = request.user as { userId: string };

            const deletePlanetService = new DeletePlanetService();

            const deletePlanet = await deletePlanetService.execute({
                id,
                user: { userId },
            });

            return reply.send(deletePlanet);
        } catch (error: unknown) {
            console.error("Error deleting planet:", error);

            const message = error instanceof Error ? error.message : "Internal Server Error";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { DeletePlanetController };
