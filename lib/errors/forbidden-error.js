'use strict';

const StackedError = require('../stacked-error');

class ForbiddenError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: ForbiddenError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(ForbiddenError, {
	NAME: {
		enumerable: true,
		value: 'ForbiddenError',
	},
	CODE: {
		enumerable: true,
		value: 'FORBIDDEN_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Forbidden',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 403,
	},
});

module.exports = ForbiddenError;
