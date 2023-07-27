import { Express } from 'express'

export interface IAppService {
	readonly instance: Express
}
