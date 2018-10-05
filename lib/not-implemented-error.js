'use strict';

class NotImplementedError extends Error {
	constructor(message, sourceFunction) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: NotImplementedError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: NotImplementedError.CODE
			},
			title: {
				enumerable: true,
				value: NotImplementedError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: NotImplementedError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});

		if (Error.captureStackTrace && sourceFunction) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}
}

Object.defineProperties(NotImplementedError, {
	NAME: {
		enumerable: true,
		value: 'NotImplementedError'
	},
	CODE: {
		enumerable: true,
		value: 'NOT_IMPLEMENTED_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Not Implemented'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 501
	}
});

module.exports = NotImplementedError;

