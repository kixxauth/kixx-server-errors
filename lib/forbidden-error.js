'use strict';

class ForbiddenError extends Error {
	constructor(message) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ForbiddenError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: ForbiddenError.CODE
			},
			title: {
				enumerable: true,
				value: ForbiddenError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: ForbiddenError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});
	}
}

Object.defineProperties(ForbiddenError, {
	NAME: {
		enumerable: true,
		value: 'ForbiddenError'
	},
	CODE: {
		enumerable: true,
		value: 'FORBIDDEN_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Forbidden'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 403
	}
});

module.exports = ForbiddenError;
