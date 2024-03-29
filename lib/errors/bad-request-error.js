'use strict';

const StackedError = require('../stacked-error');

class BadRequestError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: BadRequestError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(BadRequestError, {
	NAME: {
		enumerable: true,
		value: 'BadRequestError',
	},
	CODE: {
		enumerable: true,
		value: 'BAD_REQUEST_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Bad Request',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 400,
	},
});

module.exports = BadRequestError;
