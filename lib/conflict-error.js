'use strict';

const StackedError = require('./stacked-error');

class ConflictError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(ConflictError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ConflictError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || ConflictError.CODE,
			},
			title: {
				enumerable: true,
				value: ConflictError.TITLE,
			},
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
