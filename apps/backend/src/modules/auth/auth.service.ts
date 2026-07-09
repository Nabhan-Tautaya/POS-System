import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../users/user.repository.js";
import {
  UnauthorizedError,
  ForbiddenError,
} from "../../shared/errors/index.js";
import { env } from "../../config/env.js";

export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new ForbiddenError("Account is disabled");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    await userRepository.updateLastLogin(user.id);

    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
        organizationId: user.organizationId,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.name,
        organizationId: user.organizationId,
      },
    };
  }

  async me() {}
}

export const authService = new AuthService();
