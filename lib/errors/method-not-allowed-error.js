'use strict';

const StackedError = require('../stacked-error');

class MethodNotAllowedError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: MethodNotAllowedError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(MethodNotAllowedError, {
	NAME: {
		enumerable: true,
		value: 'MethodNotAllowedError',
	},
	CODE: {
		enumerable: true,
		value: 'METHOD_NOT_ALLOWED_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Method Not Allowed',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 405,
	},
});

module.exports = MethodNotAllowedError;
