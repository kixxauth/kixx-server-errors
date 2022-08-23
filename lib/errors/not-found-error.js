'use strict';

const StackedError = require('../stacked-error');

class NotFoundError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(NotFoundError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotFoundError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || NotFoundError.CODE,
			},
			title: {
				enumerable: true,
				value: NotFoundError.TITLE,
			},
			statusCode: {
				enumerable: true,
				value: NotFoundError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(NotFoundError, {
	NAME: {
		enumerable: true,
		value: 'NotFoundError',
	},
	CODE: {
		enumerable: true,
		value: 'NOT_FOUND_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Not Found',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 404,
	},
});

module.exports = NotFoundError;
