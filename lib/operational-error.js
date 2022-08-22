'use strict';

const StackedError = require('./stacked-error');

class OperationalError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(OperationalError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: OperationalError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || OperationalError.CODE,
			},
			title: {
				enumerable: true,
				value: OperationalError.TITLE,
			},
		});
	}
}

Object.defineProperties(OperationalError, {
	NAME: {
		enumerable: true,
		value: 'OperationalError',
	},
	CODE: {
		enumerable: true,
		value: 'OPERATIONAL_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Operational Error',
	},
});

module.exports = OperationalError;
