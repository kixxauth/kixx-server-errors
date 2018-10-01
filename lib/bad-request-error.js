'use strict';

class BadRequestError extends Error {
	constructor(message, spec = {}) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: BadRequestError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: BadRequestError.CODE
			},
			title: {
				enumerable: true,
				value: BadRequestError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: BadRequestError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			},
			parameter: {
				enumerable: true,
				value: spec.parameter
			}
		});
	}
}

Object.defineProperties(BadRequestError, {
	NAME: {
		enumerable: true,
		value: 'BadRequestError'
	},
	CODE: {
		enumerable: true,
		value: 'BAD_REQUEST_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Bad Request'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 400
	}
});

module.exports = BadRequestError;
