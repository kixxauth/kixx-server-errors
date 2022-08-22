'use strict';

const StackedError = require('./stacked-error');
const UnprocessableError = require('./unprocessable-error');

class ValidationError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(ValidationError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ValidationError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || ValidationError.CODE,
			},
			title: {
				enumerable: true,
				value: ValidationError.TITLE,
			},
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

	push(message, pointer) {
		this.unprocessableErrors.push(new UnprocessableError(message, { pointer }));
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
