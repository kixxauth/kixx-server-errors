'use strict';

const StackedError = require('../stacked-error');

class ConflictError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: ConflictError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(ConflictError, {
	NAME: {
		enumerable: true,
		value: 'ConflictError',
	},
	CODE: {
		enumerable: true,
		value: 'CONFLICT_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Conflict',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 409,
	},
});

module.exports = ConflictError;
