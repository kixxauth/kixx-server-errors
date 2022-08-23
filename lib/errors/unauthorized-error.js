'use strict';

const StackedError = require('../stacked-error');

class UnauthorizedError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(UnauthorizedError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnauthorizedError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || UnauthorizedError.CODE,
			},
			title: {
				enumerable: true,
				value: UnauthorizedError.TITLE,
			},
			statusCode: {
				enumerable: true,
				value: UnauthorizedError.STATUS_CODE,
			},
			headers: {
				enumerable: true,
				value: Object.freeze(spec.headers || {}),
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
