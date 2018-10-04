'use strict';

class NotFoundError extends Error {
	constructor(message) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotFoundError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: NotFoundError.CODE
			},
			title: {
				enumerable: true,
				value: NotFoundError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: NotFoundError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});
	}
}

Object.defineProperties(NotFoundError, {
	NAME: {
		enumerable: true,
		value: 'NotFoundError'
	},
	CODE: {
		enumerable: true,
		value: 'NOT_FOUND_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Not Found'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 404
	}
});

module.exports = NotFoundError;
