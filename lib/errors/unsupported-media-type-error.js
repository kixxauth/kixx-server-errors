'use strict';

const StackedError = require('../stacked-error');

class UnsupportedMediaTypeError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(UnsupportedMediaTypeError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnsupportedMediaTypeError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || UnsupportedMediaTypeError.CODE,
			},
			title: {
				enumerable: true,
				value: UnsupportedMediaTypeError.TITLE,
			},
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
