'use strict';

const StackedError = require('../stacked-error');

class ProgrammerError extends StackedError {
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
