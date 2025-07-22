import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateFavoritePlanetService } from "../../service/Planets/UpdateFavoritePlanetService";
import { planetParamsSchema, updateFavoritePlanetSchema } from "../../schemas/generate.schema";

class UpdateFavoritePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Parameters validation
            const validatedParams = planetParamsSchema.parse(request.params);
            const { id } = validatedParams;

            // Body validation
            const validatedBody = updateFavoritePlanetSchema.parse(request.body);
            const { isFavorite } = validatedBody;

            // Check if user is authenticated
            const { userId } = request.user as { userId: string };
            
            if (!userId) {
                return reply.status(401).send({
                    error: "Unauthorized",
                    message: "User not authenticated"
                });
            }

            const updateFavoritePlanetService = new UpdateFavoritePlanetService();
            
            const updateFavorite = await updateFavoritePlanetService.execute({ 
                id, 
                user: { userId }, 
                isFavorite 
            });

            return reply.status(200).send({ 
                success: true,
                planet: updateFavorite,
                message: "Favorite status updated successfully"
            });

        } catch (error: any) {
            // if Zod validation error
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
            console.error("Error updating favorite planet:", error);
            return reply.status(500).send({ 
                error: "Internal Server Error",
                message: error.message || "Internal server error"
            });
        }
    }
}

export { UpdateFavoritePlanetController };