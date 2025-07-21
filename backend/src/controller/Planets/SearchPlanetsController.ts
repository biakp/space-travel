import { FastifyReply, FastifyRequest } from "fastify";
import { SearchPlanetsService } from "../../service/Planets/SearchPlanetsService";
import { searchPlanetsSchema } from "../../schemas/generate.schema";

class SearchPlanetsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Validate the request query parameters using Zod schema
            const validatedQuery = searchPlanetsSchema.parse(request.query);
            const { query } = validatedQuery;
            
            const { userId } = request.user as { userId: string };
            
            if (!userId) {
                return reply.status(401).send({
                    error: "Unauthorized",
                    message: "User not authenticated"
                });
            }

            const searchPlanetsService = new SearchPlanetsService();

            const searchPlanets = await searchPlanetsService.execute({
                query,
                user: { userId }
            });

            return reply.status(200).send(searchPlanets);

        } catch (error: any) {
            // If it's a Zod validation error
            if (error.name === 'ZodError') {
                return reply.status(400).send({
                    error: "Validation Error",
                    message: "Invalid search parameters",
                    details: error.errors.map((err: any) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            // Outros erros
            console.error("Error searching planets:", error);
            return reply.status(500).send({ 
                error: "Internal Server Error", 
                message: error.message || "Internal server error" 
            });
        }
    }
}

export { SearchPlanetsController };