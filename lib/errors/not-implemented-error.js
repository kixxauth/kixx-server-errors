'use strict';

const StackedError = require('../stacked-error');

class NotImplementedError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
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

