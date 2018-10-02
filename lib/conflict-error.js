'use strict';

class ConflictError extends Error {
	constructor(message) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ConflictError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: ConflictError.CODE
			},
			title: {
				enumerable: true,
				value: ConflictError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: ConflictError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: message
			}
		});
	}
}

Object.defineProperties(ConflictError, {
	NAME: {
		enumerable: true,
		value: 'ConflictError'
	},
	CODE: {
		enumerable: true,
		value: 'CONFLICT_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Conflict'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 409
	}
});

module.exports = ConflictError;
