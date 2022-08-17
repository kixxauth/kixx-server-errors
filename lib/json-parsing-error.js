'use strict';

class JsonParsingError extends Error {
	constructor(message, err, sourceFunction) {
		let errors = [];

		if (err) {
			errors = [ err ];

			if (err.message) {
				message = `${message}: ${err.message}`;
			}
		}

		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: JsonParsingError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: JsonParsingError.CODE
			},
			errors: {
				enumerable: true,
				value: Object.freeze(errors)
			}
		});

		if (sourceFunction && Error.captureStackTrace) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}
}

Object.defineProperties(JsonParsingError, {
	NAME: {
		enumerable: true,
		value: 'JsonParsingError'
	},
	CODE: {
		enumerable: true,
		value: 'JSON_PARSING_ERROR'
	}
});

module.exports = JsonParsingError;
