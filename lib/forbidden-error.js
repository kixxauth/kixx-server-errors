'use strict';

const StackedError = require('./stacked-error');

class ForbiddenError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(ForbiddenError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ForbiddenError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || ForbiddenError.CODE,
			},
			title: {
				enumerable: true,
				value: ForbiddenError.TITLE,
			},
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
