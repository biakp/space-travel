import fastify, { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { routes } from "./routes";

const app = fastify({
    logger: true, // Enable logging
});

const start = async () => {

    app.register(routes); // Register the routes defined in routes.ts

    // Route to login a user

    app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => { // Route to handle user login
        const { email, password } = request.body as {
            email: string;
            password: string;
        };

        if (!email || !password) {
            return reply.status(400).send({ error: "Email and password are required." }); // Check if email and password are provided
        }

        const user = await prismaClient.user.findFirst({
            where: { email: email }, // Find the user by email
        });

        if (!user) {
            return reply.status(400).send({ error: "User not found." }); // Check if the user exists
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password

        if (!isPasswordValid) {
            return reply.status(400).send({ error: "Invalid password." }); // Check if the password is valid
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET!, // Use your secret key from .env
            { expiresIn: "72h" }
        );

        return {
            erro: false,
            message: "Login successful.",
            user: {
                fullName: user.fullName,
                email: user.email
            },
            accessToken
        }

    });

    app.listen({ port: 8000 });
    console.log("Server is running on http://localhost:8000");
};

start();
