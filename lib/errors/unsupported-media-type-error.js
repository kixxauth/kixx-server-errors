'use strict';

const StackedError = require('../stacked-error');

class UnsupportedMediaTypeError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(message, spec);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: UnsupportedMediaTypeError.STATUS_CODE,
			},
		});
	}
}

Object.defineProperties(UnsupportedMediaTypeError, {
	NAME: {
		enumerable: true,
		value: 'UnsupportedMediaTypeError',
	},
	CODE: {
		enumerable: true,
		value: 'UNSUPPORTED_MEDIA_TYPE_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Unsupported Media Type',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 415,
	},
});

module.exports = UnsupportedMediaTypeError;
