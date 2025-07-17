import fastify, { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = fastify({
    logger: true, // Enable logging
});

const start = async () => {
    app.get("/backend", async (request: FastifyRequest, reply: FastifyReply) => {
        reply.status(200).send({ message: "Hello from the backend!" });
    });

    app.post(
        "/create-account",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const { fullName, email, password } = request.body as {
                fullName: string;
                email: string;
                password: string;
            };

            if (!fullName || !email || !password) {
                reply.status(400).send({ error: "All fields are required." });
            }

            const isUser = await prismaClient.user.findFirst({
                where: { email: email },
            });

            if (isUser) {
                reply.status(400).send({ error: "User already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

            const user = await prismaClient.user.create({
                // Create a new user
                data: {
                    fullName,
                    email,
                    password: hashedPassword,
                },
            });

            const accessToken = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET!, // Use your secret key from .env
                { expiresIn: "72h", }
            );

            reply.status(201).send({
                error: false,
                user: {
                    fullName: user.fullName,
                    email: user.email
                },
                accessToken,
                message: "User created successfully."
            });

        }
    );

    app.listen({ port: 8000 });
    console.log("Server is running on http://localhost:8000");
};

start();
