'use strict';

class UnsupportedMediaTypeError extends Error {
	constructor(message) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnsupportedMediaTypeError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: UnsupportedMediaTypeError.CODE
			},
			title: {
				enumerable: true,
				value: UnsupportedMediaTypeError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: UnsupportedMediaTypeError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});
	}
}

Object.defineProperties(UnsupportedMediaTypeError, {
	NAME: {
		enumerable: true,
		value: 'UnsupportedMediaTypeError'
	},
	CODE: {
		enumerable: true,
		value: 'UNSUPPORTED_MEDIA_TYPE_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Unsupported Media Type'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 415
	}
});

module.exports = UnsupportedMediaTypeError;
