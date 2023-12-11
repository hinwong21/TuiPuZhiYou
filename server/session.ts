// typings/express.d.ts
import express from "express";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    username?: string;
    isLogin?: boolean;
  }
}

declare module "express" {
  interface Request {
    session: session.Session & {
      userId?: string;
      username?: string;
      isLogin?: boolean;
    };
  }
}
