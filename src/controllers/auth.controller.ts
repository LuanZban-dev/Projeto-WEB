import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {

  async register(request: Request, response: Response) {

    const user = await authService.register(request.body);

    return response.status(201).json(user);

  }

  async login(request: Request, response: Response) {

    const { email, password } = request.body;

    const result = await authService.login(email, password);

    return response.json(result);

}

}