'use strict';

const StackedError = require('./stacked-error');

class JsonParsingError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(JsonParsingError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: JsonParsingError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || JsonParsingError.CODE,
			},
			title: {
				enumerable: true,
				value: JsonParsingError.TITLE,
			},
		});
	}
}

Object.defineProperties(JsonParsingError, {
	NAME: {
		enumerable: true,
		value: 'JsonParsingError',
	},
	CODE: {
		enumerable: true,
		value: 'JSON_PARSING_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'JSON Parsing Error',
	},
});

module.exports = JsonParsingError;
