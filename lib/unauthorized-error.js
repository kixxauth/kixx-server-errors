'use strict';


class UnauthorizedError extends Error {
	constructor(message, spec = {}) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UnauthorizedError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: UnauthorizedError.CODE
			},
			title: {
				enumerable: true,
				value: UnauthorizedError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: UnauthorizedError.STATUS_CODE
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

Object.defineProperties(UnauthorizedError, {
	NAME: {
		enumerable: true,
		value: 'UnauthorizedError'
	},
	CODE: {
		enumerable: true,
		value: 'UNAUTHORIZED_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Unauthorized'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 401
	}
});

module.exports = UnauthorizedError;
