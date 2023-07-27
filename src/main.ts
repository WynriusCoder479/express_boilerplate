import 'dotenv/config'
import { createServer } from 'http'
import 'reflect-metadata'
import { DependencyContainer } from './services'
import { IAppService, ILoggerService, Types } from './services/types'
import { logEndpoints } from './utils'

async function main() {
	const container = new DependencyContainer()

	const app = container.instance.get<IAppService>(Types.APP).instance

	const logger = container.instance.get<ILoggerService>(Types.LOGGER_SERVICE)

	const httpServer = createServer(app)

	await new Promise<void>(resolve => httpServer.listen({ port: 8080 }, resolve))
		.then(_ => logger.info(`Http server starting on port 8080`))
		.then(_ => logEndpoints(app, logger))
		.catch(err =>
			logger.error(`An error occurred while starting http server ::: ${err}`)
		)
}

main()
