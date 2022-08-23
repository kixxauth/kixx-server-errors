'use strict';

const StackedError = require('../stacked-error');

class JsonParsingError extends StackedError {

	constructor(message, spec, sourceFunction) {
		spec = spec || {};
		super(message, spec, sourceFunction);
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
