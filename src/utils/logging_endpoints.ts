import listEndpoints from 'express-list-endpoints'
import { ILoggerService } from '../services/types'
import { Express } from 'express'

export function logEndpoints(app: Express, logger: ILoggerService) {
	const endpoints = listEndpoints(app)

	endpoints.map(endpoint =>
		logger.info(
			`path: ${endpoint.path}, method: ${endpoint.methods
				.toString()
				.toUpperCase()}, middlewares: ${endpoint.middlewares}`
		)
	)
}
