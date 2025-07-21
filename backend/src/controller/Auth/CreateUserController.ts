import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../../service/Auth/CreateUserService";
import { createUserSchema } from "../../schemas/generate.schema";

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Manual validation with Zod
            const validatedData = createUserSchema.parse(request.body);
            
            const { fullName, email, password } = validatedData;

            const createUserService = new CreateUserService();

            const user = await createUserService.execute({
                fullName,
                email,
                password,
            });

            return reply.send(user);
        } catch (error: any) {
            // If the error is a Zod validation error, return a 400 status with details
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

            // Other errors (e.g., service errors)
            console.error("Error creating user:", error);
            return reply.status(400).send({ 
                erro: true, 
                message: error.message || "Internal server error" 
            });
        }
    }
}

export { CreateUserController };
