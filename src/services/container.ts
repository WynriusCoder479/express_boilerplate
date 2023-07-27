import { Container } from 'inversify'
import { IAppService, ILoggerService, Types } from './types'
import { ApplicationService } from './application.service'
import { LoggerService } from './logger.service'

export class DependencyContainer {
	private readonly container: Container

	constructor() {
		this.container = new Container()

		this.config()
	}

	private config() {
		this.container.bind<IAppService>(Types.APP).to(ApplicationService)
		this.container.bind<ILoggerService>(Types.LOGGER_SERVICE).to(LoggerService)
	}

	get instance() {
		return this.container
	}
}
