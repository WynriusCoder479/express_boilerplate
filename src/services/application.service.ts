import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors, { CorsRequest } from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { routes } from '../routes'
import { AppError, ResponseType } from '../types'
import { IAppService, ILoggerService, Types } from './types'

@injectable()
export class ApplicationService implements IAppService {
	private readonly application: Express

	constructor(
		@inject(Types.LOGGER_SERVICE) private readonly logger: ILoggerService
	) {
		this.application = express()

		this.config()
	}

	private config() {
		this.application.use(
			(_req: Request, res: Response, next: NextFunction) => {
				res.header('Access-Control-Allow-Origin', '*')
				res.header(
					'Access-Control-Allow-Methods',
					'GET,POST,DELETE,OPTIONS,PUT'
				)
				res.header('Access-Control-Allow-Headers', '*')
				next()
			},

			cors<CorsRequest>({
				origin: '*',
				credentials: true
			}),

			bodyParser.json(),

			bodyParser.urlencoded({ extended: true }),

			cookieParser(),

			(req: Request, _res: Response, next: NextFunction) => {
				this.logger.http(`${req.method} url:::${req.url}`)

				next()
			}
		)

		this.application.use('/api', routes)

		this.application.use(this.errorResponse())
	}

	private errorResponse() {
		return (
			error: AppError,
			_req: Request,
			res: Response<ResponseType>,
			_next: NextFunction
		) => {
			res.header('Content-Type', 'application/json')

			const { code, status, message, errors } = error.exception

			this.logger.error(message as string)

			res.status(error.exception.code || 500).json({
				code: code || 500,
				status: status || 'INTERNAL_SERVER_ERROR',
				success: false,
				message,
				errors
			})
		}
	}

	get instance() {
		return this.application
	}
}
