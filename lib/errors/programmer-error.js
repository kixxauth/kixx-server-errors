'use strict';

const StackedError = require('../stacked-error');

class ProgrammerError extends StackedError {

	constructor(message, spec) {
		spec = spec || {};
		super(ProgrammerError.NAME, message, spec);
		const err = spec.err || {};

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: ProgrammerError.NAME,
			},
			code: {
				enumerable: true,
				value: spec.code || err.code || ProgrammerError.CODE,
			},
			title: {
				enumerable: true,
				value: ProgrammerError.TITLE,
			},
		});
	}
}

Object.defineProperties(ProgrammerError, {
	NAME: {
		enumerable: true,
		value: 'ProgrammerError',
	},
	CODE: {
		enumerable: true,
		value: 'PROGRAMMER_ERROR',
	},
	TITLE: {
		enumerable: true,
		value: 'Programmer Error',
	},
});

module.exports = ProgrammerError;
