import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserProps {
    email: string;
    fullName: string;
    password: string;
}

class CreateUserService {
    async execute({ email, fullName, password }: UserProps) {
        const isUser = await prismaClient.user.findFirst({
            where: { email: email },
        });

        if (isUser) {
            throw new Error("User already exists."); // Check if the user already exists
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

        const user = await prismaClient.user.create({ // Create a new user in the database
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

        return {
            error: false,
            user: {
                fullName: user.fullName,
                email: user.email
            },
            accessToken,
            message: "User created successfully."
        };

    }
}


export { CreateUserService };