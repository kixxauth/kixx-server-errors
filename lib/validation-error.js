'use strict';

const UnprocessableError = require('./uprocessable-error');

class ValidationError extends Error {
	constructor() {
		const message = 'List of validation errors';

		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: 'ValidationError'
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: 'VALIDATION_ERROR_CONTAINER'
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

module.exports = ValidationError;
