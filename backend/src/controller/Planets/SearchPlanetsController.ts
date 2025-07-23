import { FastifyReply, FastifyRequest } from "fastify";
import { SearchPlanetsService } from "../../service/Planets/SearchPlanetsService";
import { searchPlanetsSchema } from "../../schemas/generate.schema";

class SearchPlanetsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { query } = searchPlanetsSchema.parse(request.query);

            const { userId } = request.user as { userId: string };

            if (!userId) {
                return reply.status(401).send({
                    error: "Unauthorized",
                    message: "User not authenticated",
                });
            }

            const searchPlanetsService = new SearchPlanetsService();

            const searchPlanets = await searchPlanetsService.execute({
                query,
                user: { userId },
            });

            return reply.status(200).send(searchPlanets);
        } catch (error: unknown) {
            console.error("Error searching planets:", error);

            const message = error instanceof Error ? error.message : "Internal server error";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { SearchPlanetsController };
