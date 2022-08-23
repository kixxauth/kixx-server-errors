'use strict';

const StackedError = require('../stacked-error');

class UserError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(UserError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: UserError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || UserError.CODE,
			},
			title: {
				enumerable: true,
				value: UserError.TITLE,
			},
		});
	}
}

Object.defineProperties(UserError, {
	NAME: {
		enumerable: true,
		value: 'UserError',
	},
	CODE: {
		enumerable: true,
		value: 'USER_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'User Error',
	},
});

module.exports = UserError;
