import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateFavoritePlanetService } from "../../service/Planets/UpdateFavoritePlanetService";
import { planetParamsSchema, updateFavoritePlanetSchema } from "../../schemas/generate.schema";

class UpdateFavoritePlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = planetParamsSchema.parse(request.params);
            const { isFavorite } = updateFavoritePlanetSchema.parse(request.body);

            const { userId } = request.user as { userId: string };

            if (!userId) {
                return reply.status(401).send({
                    error: "Unauthorized",
                    message: "User not authenticated",
                });
            }

            const updateFavoritePlanetService = new UpdateFavoritePlanetService();

            const updateFavorite = await updateFavoritePlanetService.execute({
                id,
                user: { userId },
                isFavorite,
            });

            return reply.status(200).send({
                success: true,
                planet: updateFavorite,
                message: "Favorite status updated successfully",
            });
        } catch (error: unknown) {
            console.error("Error updating favorite planet:", error);

            const message = error instanceof Error ? error.message : "Internal server error";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { UpdateFavoritePlanetController };
