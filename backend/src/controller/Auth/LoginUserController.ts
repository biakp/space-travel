import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserService } from "../../service/Auth/LoginUserService";
import { loginUserSchema } from "../../schemas/generate.schema";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Validate request body with Zod schema
            const { email, password } = loginUserSchema.parse(request.body);

            const loginUserService = new LoginUserService();

            const login = await loginUserService.execute({
                email,
                password,
            });

            return reply.send(login);
        } catch (error: unknown) {

            // Other errors
            console.error("Error during login:", error);
            const message = error instanceof Error ? error.message : "Internal Server Error";
            return reply.status(500).send({
                error: "Internal Server Error",
                message,
            });
        }
    }
}

export { LoginUserController };