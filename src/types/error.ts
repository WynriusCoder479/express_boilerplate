import { ResponseType } from './response'

export class AppError extends Error {
	exception: Omit<ResponseType, 'data' | 'success'>

	constructor(exception: Omit<ResponseType, 'data' | 'success'>) {
		super(exception.message)

		this.exception = {
			code: exception.code,
			message: exception.message,
			status: exception.status,
			errors: exception.errors
		}

		Error.captureStackTrace(this)
	}
}
