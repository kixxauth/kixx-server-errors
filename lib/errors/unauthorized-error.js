'use strict';

const StackedError = require('../stacked-error');

class UnauthorizedError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: UnauthorizedError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(UnauthorizedError, {
	NAME: {
		enumerable: true,
		value: 'UnauthorizedError',
	},
	CODE: {
		enumerable: true,
		value: 'UNAUTHORIZED_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Unauthorized',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 401,
	},
});

module.exports = UnauthorizedError;
