'use strict';

const StackedError = require('../stacked-error');

class OperationalError extends StackedError {

	constructor(message, spec, sourceFunction) {
		spec = spec || {};
		super(message, spec, sourceFunction);
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
