import { FastifyReply, FastifyRequest } from "fastify"
import { LoginUserService } from "../service/LoginUserService"

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string } // Extract email and password from the request body

        if (!email || !password) {
            reply.status(400).send({ message: "All fields are required" })
        }

        try {
            const loginUserService = new LoginUserService()
            const login = await loginUserService.execute({ email, password }) // Call the service to handle user login

            reply.send(login);
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message }) // Handle errors during login
        }
    }

}
export { LoginUserController }