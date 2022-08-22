'use strict';

const StackedError = require('./stacked-error');

class BadRequestError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(BadRequestError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: BadRequestError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || BadRequestError.CODE,
			},
			title: {
				enumerable: true,
				value: BadRequestError.TITLE,
			},
			statusCode: {
				enumerable: true,
				value: BadRequestError.STATUS_CODE,
			},
			parameter: {
				enumerable: true,
				value: spec.parameter,
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
