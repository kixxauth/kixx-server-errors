'use strict';

const UnprocessableError = require('./unprocessable-error');

class ValidationError extends Error {
	constructor() {
		const message = 'List of validation errors';

		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ValidationError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: ValidationError.CODE
			},
			errors: {
				value: []
			}
		});
	}

	push(message, pointer) {
		this.errors.push(new UnprocessableError(message, {pointer}));
	}

	withErrorsOrNull() {
		return this.errors.length > 0 ? this : null;
	}
}

Object.defineProperties(ValidationError, {
	NAME: {
		enumerable: true,
		value: 'ValidationError'
	},
	CODE: {
		enumerable: true,
		value: 'VALIDATION_ERROR_CONTAINER'
	}
});

module.exports = ValidationError;
