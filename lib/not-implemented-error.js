'use strict';

const StackedError = require('./stacked-error');

class NotImplementedError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(NotImplementedError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotImplementedError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || NotImplementedError.CODE,
			},
			title: {
				enumerable: true,
				value: NotImplementedError.TITLE,
			},
			statusCode: {
				enumerable: true,
				value: NotImplementedError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(NotImplementedError, {
	NAME: {
		enumerable: true,
		value: 'NotImplementedError',
	},
	CODE: {
		enumerable: true,
		value: 'NOT_IMPLEMENTED_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Not Implemented',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 501,
	},
});

module.exports = NotImplementedError;

