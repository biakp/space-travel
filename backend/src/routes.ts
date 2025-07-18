import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/CreateUserController";

// Register the routes for user account creation
// This function will be called in server.ts to register the routes with Fastify
export function routes(fastify: FastifyInstance) {
    fastify.post(
        "/create-account",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new CreateUserController().handle(request, reply);
        }
    );
}
