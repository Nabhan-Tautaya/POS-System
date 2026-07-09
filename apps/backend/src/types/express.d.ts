export {};

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: string;
      organizationId: string;
    }

    interface Request {
      user: UserPayload;
    }
  }
}
