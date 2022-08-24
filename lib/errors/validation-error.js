'use strict';

const StackedError = require('../stacked-error');
const UnprocessableError = require('./unprocessable-error');

class ValidationError extends StackedError {

	constructor(message, spec, sourceFunction) {
		super(message, spec, sourceFunction);

		Object.defineProperties(this, {
			statusCode: {
				enumerable: true,
				value: ValidationError.STATUS_CODE,
			},
			unprocessableErrors: {
				enumerable: true,
				value: [],
			},
		});
	}

	push(message, pointer, value) {
		this.unprocessableErrors.push(new UnprocessableError(message, { pointer, value }));
	}

	withErrorsOrNull() {
		return this.unprocessableErrors.length > 0 ? this : null;
	}
}

Object.defineProperties(ValidationError, {
	NAME: {
		enumerable: true,
		value: 'ValidationError',
	},
	CODE: {
		enumerable: true,
		value: 'VALIDATION_ERROR_CONTAINER',
	},
	TITLE: {
		enumerable: true,
		value: 'Validation Error',
	},
	STATUS_CODE: {
		enumerable: true,
		value: 400,
	},
});

module.exports = ValidationError;
