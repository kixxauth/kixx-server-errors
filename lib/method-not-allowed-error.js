'use strict';

class MethodNotAllowedError extends Error {
	constructor(message, spec = {}) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: MethodNotAllowedError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: MethodNotAllowedError.CODE
			},
			title: {
				enumerable: true,
				value: MethodNotAllowedError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: MethodNotAllowedError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			},
			headers: {
				enumerable: true,
				value: Object.freeze(spec.headers || {})
			}
		});
	}
}

Object.defineProperties(MethodNotAllowedError, {
	NAME: {
		enumerable: true,
		value: 'MethodNotAllowedError'
	},
	CODE: {
		enumerable: true,
		value: 'METHOD_NOT_ALLOWED_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Method Not Allowed'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 405
	}
});

module.exports = MethodNotAllowedError;
