import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import { GetUserController } from "./controller/Auth/GetUserController";
import { AddPlanetController } from "./controller/Planets/AddPlanetController";
import { GetAllPlanetsController } from "./controller/Planets/GetAllPlanetsController";

// This function will be called in server.ts to register the routes with Fastify
export async function routes(fastify: FastifyInstance) {
    // Register the routes for user creation
    fastify.post(
        "/create-account",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new CreateUserController().handle(request, reply);
        }
    );

    // Register the routes for user login
    fastify.post(
        "/login",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new LoginUserController().handle(request, reply);
        }
    );

    // Register the route to get user details, protected by authentication middleware
    fastify.get('/get-user', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply)
    })

    // Register the route to add a registered planet, protected by authentication middleware
    fastify.post(
        "/add-registered-planet",{ preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
            return new AddPlanetController().handle(request, reply);
        })

    // Register the route to get all planets, protected by authentication middleware
    fastify.get('/get-all-planets', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetAllPlanetsController().handle(request, reply)
    })
}