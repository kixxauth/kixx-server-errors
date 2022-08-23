'use strict';

const StackedError = require('../stacked-error');

class UnprocessableError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(UnprocessableError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnprocessableError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || UnprocessableError.CODE,
			},
			title: {
				enumerable: true,
				value: UnprocessableError.TITLE,
			},
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
