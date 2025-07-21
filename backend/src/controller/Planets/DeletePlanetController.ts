import { FastifyReply, FastifyRequest } from "fastify";
import { DeletePlanetService } from "../../service/Planets/DeletePlanetService";
import { planetParamsSchema } from "../../schemas/generate.schema";

class DeletePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Validate the request parameters using Zod schema
            const validatedParams = planetParamsSchema.parse(request.params);
            const { id } = validatedParams;
            
            const { userId } = request.user as { userId: string };

            const deletePlanetService = new DeletePlanetService();

            const deletePlanet = await deletePlanetService.execute({
                id,
                user: { userId },
            });

            return reply.send(deletePlanet);
        } catch (error: any) {
            // If it's a Zod validation error
            if (error.name === 'ZodError') {
                return reply.status(400).send({
                    error: "Validation Error",
                    message: "Invalid data",
                    details: error.errors.map((err: any) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            // Outros erros
            console.error("Error deleting planet:", error);
            return reply.status(500).send({ 
                error: "Internal Server Error", 
                message: error.message || "Internal Server Error" 
            });
        }
    }
}

export { DeletePlanetController };