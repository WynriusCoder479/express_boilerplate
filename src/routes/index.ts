import express, { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AppError } from '../types'

export const routes = express.Router()

routes.get(
	'/test',
	expressAsyncHandler(
		async (_req: Request, _res: Response, _next: NextFunction) => {
			throw new AppError({
				code: 500,
				status: 'Internal server error',
				message: 'Test error'
			})
		}
	)
)
