'use strict';

class UnprocessableError extends Error {
	constructor(message, spec = {}) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnprocessableError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: UnprocessableError.CODE
			},
			title: {
				enumerable: true,
				value: UnprocessableError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: UnprocessableError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			},
			pointer: {
				enumerable: true,
				value: spec.pointer
			}
		});
	}
}

Object.defineProperties(UnprocessableError, {
	NAME: {
		enumerable: true,
		value: 'UnprocessableError'
	},
	CODE: {
		enumerable: true,
		value: 'UNPROCESSABLE_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Unprocessable Entity'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 422
	}
});

module.exports = UnprocessableError;
