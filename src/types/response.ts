export interface IResponse {
	code: number
	status: string
	success: boolean
	message?: string
}

export interface IFieldError {
	field: string
	message: string
}

export type ResponseType<T = null> = IResponse & {
	data?: T
	errors: IFieldError[]
}
