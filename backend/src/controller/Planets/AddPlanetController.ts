import { FastifyReply, FastifyRequest } from "fastify";
import { AddPlanetService } from "../../service/Planets/AddPlanetService";
import { addPlanetSchema } from "../../schemas/generate.schema";

class AddPlanetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Validation of the request body
            const validatedData = addPlanetSchema.parse(request.body);
            
            const { title, story, visitedPlanet, imageUrl, visitedDate } = validatedData;
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

            // Other errors
            console.error("Error adding planet:", error);
            return reply.status(500).send({ 
                error: "Internal Server Error", 
                message: error.message || "Internal server error" 
            });
        }
    }
}

export { AddPlanetController };
