import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import { GetUserController } from "./controller/Auth/GetUserController";
import { AddPlanetController } from "./controller/Planets/AddPlanetController";
import { GetAllPlanetsController } from "./controller/Planets/GetAllPlanetsController";
import { SearchPlanetsController } from "./controller/Planets/SearchPlanetsController";
import { UpdatePlanetController } from "./controller/Planets/UpdatePlanetController";
import { DeletePlanetController } from "./controller/Planets/DeletePlanetController";
import { GenerateAIController } from "./controller/AI/GenerateAIController";
import { UploadImageController } from "./controller/Upload/UploadImageController";
import { upload } from "./config/multer";

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
    fastify.get(
        "/get-user",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new GetUserController().handle(request, reply);
        }
    );

    // Register the route to add a registered planet
    fastify.post(
        "/add-registered-planet",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new AddPlanetController().handle(request, reply);
        }
    );

    // Register the route to get all planets
    fastify.get(
        "/get-all-planets",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new GetAllPlanetsController().handle(request, reply);
        }
    );

    // Register the route to search for planets
    fastify.get(
        "/search-planets",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new SearchPlanetsController().handle(request, reply);
        }
    );

    // Register the route to update a planet
    fastify.put(
        "/update-planet/:id",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new UpdatePlanetController().handle(request, reply);
        }
    );

    // Register the route to delete a planet
    fastify.delete(
        "/delete-planet/:id",
        { preHandler: authenticateToken },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new DeletePlanetController().handle(request, reply);
        }
    );

    // Register the route to update an image
    fastify.post(
        "/upload-image", {preHandler: upload.single('image')},
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new UploadImageController().handle(request, reply);
        }
    );

    // Register the route to generate IA content
    fastify.post(
        "/ai",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new GenerateAIController().handle(request, reply);
        }
    );
}
