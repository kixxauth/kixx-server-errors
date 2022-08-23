'use strict';

const StackedError = require('../stacked-error');

class NotAcceptableError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(message, spec);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: NotAcceptableError.STATUS_CODE,
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
