import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserProps {
    email: string;
    fullName: string;
    password: string;
}

class CreateUserService {
    async execute({ email, fullName, password }: UserProps) { }
 }

export { CreateUserService };