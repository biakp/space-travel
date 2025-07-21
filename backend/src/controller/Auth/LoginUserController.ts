import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserService } from "../../service/Auth/LoginUserService";
import { loginUserSchema } from "../../schemas/generate.schema";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Validate request body with Zod schema
            const validatedData = loginUserSchema.parse(request.body);

            const { email, password } = validatedData;

            const loginUserService = new LoginUserService();

            const login = await loginUserService.execute({
                email,
                password,
            });

            return reply.send(login);
        } catch (error: any) {
            // If the error is a Zod validation error, we handle it specifically
            if (error.name === 'ZodError') {
                return reply.status(400).send({
                    error: "Validation Error",
                    message: "Dados inválidos",
                    details: error.errors.map((err: any) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            // Other errors
            console.error("Error during login:", error);
            return reply.status(500).send({
                error: "Internal Server Error",
                message: error.message || "Internal Server Error"
            });
        }
    }
}

export { LoginUserController };