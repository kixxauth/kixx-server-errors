'use strict';

const StackedError = require('../stacked-error');

class NotFoundError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
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
