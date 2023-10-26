import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entity/user";
dotenv.config();

// Extract AccessToken
const extractAccessToken = (req: Request): string => {
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	} else {
		throw new Error("JWT token does not exist");
	}
};

// Check Access Token
export const checkAccessToken = (req: Request, res: Response, next: NextFunction): Response => {
	try {
		const token = extractAccessToken(req);
		const jwtPayload = jwt.verify(token, process.env.JWT_TOKEN_KEY);
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		return res.status(401).send({ message: "Invalid token value" });
	}

	next();
};

// Check Admin Access Token
export const checkAdminAccessToken = (req: Request, res: Response, next: NextFunction): Response => {
	try {
		const token = extractAccessToken(req);
		const jwtPayload = jwt.verify(token, process.env.JWT_TOKEN_KEY);
		if (!jwtPayload.admin) {
			throw new Error();
		}
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		return res.status(401).send({ message: "Not an administrator." });
	}

	next();
};

// Make a Access Token
export const generateAccessToken = (user: User): { aud: string; admin: boolean } => {
	return jwt.sign(
		{
			aud: user.public_address,
			admin: user.is_admin === "O",
		},
		process.env.JWT_TOKEN_KEY,
		{ expiredIn: "3h" },
	);
};
