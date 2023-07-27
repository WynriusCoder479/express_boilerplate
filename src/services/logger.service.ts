import { injectable } from 'inversify'
import { ILoggerService } from './types'
import { Logger, addColors, createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import { LoggerConfig } from '../configs'

@injectable()
export class LoggerService implements ILoggerService {
	private log: Logger

	private levels: Record<string, number> = {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4
	}

	private colors: Record<string, string> = {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'white',
		http: 'magenta'
	}

	private formatConsole = format.combine(
		format.splat(),
		format.timestamp({
			format: LoggerConfig.datetimePartern
		}),
		format.colorize({
			all: true
		}),
		format.printf(log => {
			if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`

			return `[${log.timestamp}] [${log.level}] ${log.message}`
		})
	)

	private formatFile = format.combine(
		format.splat(),
		format.colorize(),
		format.timestamp(),
		format.prettyPrint()
	)

	constructor() {
		this.createWinstonOptions()
	}

	private createWinstonOptions() {
		addColors(this.colors)

		this.log = createLogger({
			levels: this.levels,
			transports: [
				new transports.Console({
					level: 'debug',
					format: this.formatConsole
				}),
				new transports.DailyRotateFile({
					level: 'error',
					filename: LoggerConfig.errorLogsFilePath,
					datePattern: LoggerConfig.datePartern,
					zippedArchive: false,
					maxFiles: LoggerConfig.expiredFile,
					format: this.formatFile
				}),
				new transports.DailyRotateFile({
					filename: LoggerConfig.combineLogsFilePath,
					datePattern: LoggerConfig.datePartern,
					zippedArchive: false,
					maxFiles: LoggerConfig.expiredFile,
					format: this.formatFile
				})
			]
		})
	}

	get logger() {
		return this.log
	}

	public info(message: any): void {
		this.log.info(message)
	}

	public error(message: string, stack?: string): void {
		this.log.error(message, stack)
	}

	public warn(message: string): void {
		this.log.warn(message)
	}

	public http(message: string): void {
		this.log.http(message)
	}

	public debug(message: string): void {
		this.log.debug(message)
	}
}
