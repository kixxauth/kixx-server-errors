'use strict';

const StackedError = require('../stacked-error');

class UnprocessableError extends StackedError {

	constructor(message, spec, sourceFunction) {
		spec = spec || {};
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: UnprocessableError.STATUS_CODE,
			},
			pointer: {
				enumerable: true,
				value: spec.pointer,
			},
		});
	}
}

Object.defineProperties(UnprocessableError, {
	NAME: {
		enumerable: true,
		value: 'UnprocessableError',
	},
	CODE: {
		enumerable: true,
		value: 'UNPROCESSABLE_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Unprocessable Entity',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 422,
	},
});

module.exports = UnprocessableError;
