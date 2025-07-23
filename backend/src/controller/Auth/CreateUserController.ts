import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../../service/Auth/CreateUserService";
import { createUserSchema } from "../../schemas/generate.schema";

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Manual validation with Zod
            const { fullName, email, password } = createUserSchema.parse(request.body);

            const createUserService = new CreateUserService();

            const user = await createUserService.execute({
                fullName,
                email,
                password,
            });

            return reply.send(user);
        } catch (error: unknown) {

            // Other errors (e.g., service errors)
            console.error("Error creating user:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            return reply.status(400).send({ 
                erro: true, 
                message,
            });
        }
    }
}

export { CreateUserController };
