import bcrypt from "bcrypt";
import { prisma } from "../database/prisma";
import jwt from "jsonwebtoken";


type RegisterDTO = {

    username: string;

    email: string;

    password: string;

};

export class AuthService {

    async login(email: string, password: string) {

    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Email ou senha inválidos.");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
        throw new Error("Email ou senha inválidos.");
    }

    const token = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d"
        }
    );

    return {

        token,

        user: {

            id: user.id,
            username: user.username,
            email: user.email

        }

    };

}

    async register(data: RegisterDTO) {

        if (!data.username || !data.email || !data.password) {

            throw new Error("Todos os campos são obrigatórios.");

        }

        const emailExists = await prisma.user.findUnique({

            where: {
                email: data.email
            }

        });

        if (emailExists) {

            throw new Error("E-mail já cadastrado.");

        }

        const usernameExists = await prisma.user.findUnique({

            where: {
                username: data.username
            }

        });

        if (usernameExists) {

            throw new Error("Usuário já cadastrado.");

        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({

            data: {

                username: data.username,

                email: data.email,

                passwordHash: passwordHash

            }

        });

        return {

            id: user.id,

            username: user.username,

            email: user.email

        };

    }

}