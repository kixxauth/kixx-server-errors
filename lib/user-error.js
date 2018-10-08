'use strict';

class UserError extends Error {
	constructor(message, sourceFunction) {
		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UserError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: UserError.CODE
			}
		});

		if (sourceFunction && Error.captureStackTrace) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}
}

Object.defineProperties(UserError, {
	NAME: {
		enumerable: true,
		value: 'UserError'
	},
	CODE: {
		enumerable: true,
		value: 'USER_ERROR'
	}
});

module.exports = UserError;
