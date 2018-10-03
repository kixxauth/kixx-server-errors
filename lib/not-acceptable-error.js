'use strict';

class NotAcceptableError extends Error {
	constructor(message) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotAcceptableError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: NotAcceptableError.CODE
			},
			title: {
				enumerable: true,
				value: NotAcceptableError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: NotAcceptableError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});
	}
}

Object.defineProperties(NotAcceptableError, {
	NAME: {
		enumerable: true,
		value: 'NotAcceptableError'
	},
	CODE: {
		enumerable: true,
		value: 'NOT_ACCEPTABLE_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Not Acceptable'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 406
	}
});

module.exports = NotAcceptableError;
