'use strict';

const StackedError = require('../stacked-error');

class NotAcceptableError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(NotAcceptableError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotAcceptableError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || NotAcceptableError.CODE,
			},
			title: {
				enumerable: true,
				value: NotAcceptableError.TITLE,
			},
			statusCode: {
				enumerable: true,
				value: NotAcceptableError.STATUS_CODE,
			},
			location: {
				enumerable: true,
				value: spec.location,
			},
		});
	}
}

Object.defineProperties(NotAcceptableError, {
	NAME: {
		enumerable: true,
		value: 'NotAcceptableError',
	},
	CODE: {
		enumerable: true,
		value: 'NOT_ACCEPTABLE_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Not Acceptable',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 406,
	},
});

module.exports = NotAcceptableError;
