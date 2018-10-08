'use strict';

const {EOL} = require('os');

class StackedError extends Error {
	constructor(originalMessage, err, sourceFunction) {
		let errors = [];

		if (err && Array.isArray(err.errors)) {
			errors = err.errors.slice();
			errors.unshift(err);
		} else if (err) {
			errors = Array.isArray(err) ? err : [err];
		}

		const message = errors[0] ? `${originalMessage}: ${errors[0].message}` : originalMessage;

		super(message);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: StackedError.NAME
			},
			message: {
				enumerable: true,
				value: message
			},
			code: {
				enumerable: true,
				value: StackedError.CODE
			},
			title: {
				enumerable: true,
				value: StackedError.TITLE
			},
			statusCode: {
				enumerable: true,
				value: StackedError.STATUS_CODE
			},
			detail: {
				enumerable: true,
				value: originalMessage
			},
			errors: {
				enumerable: true,
				value: Object.freeze(errors)
			}
		});

		if (Error.captureStackTrace && sourceFunction) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}

	getFullStack() {
		const errors = [this].concat(this.errors);
		return errors.map((err) => {
			return err ? err.stack || 'No stack trace' : 'Null or undefined error';
		}).join(`${EOL}caused by:${EOL}`);
	}

	includesErrorCode(code) {
		const errors = [this].concat(this.errors);
		for (let i = 0; i < errors.length; i++) {
			if (errors[i] && errors[i].code === code) {
				return code;
			}
		}
		return false;
	}

	getOperationalError() {
		for (let i = this.errors.length - 1; i >= 0; i--) {
			const err = this.errors[i];
			if (err && Number.isInteger(err.statusCode)) {
				return err;
			}
		}
		return this;
	}
}

Object.defineProperties(StackedError, {
	NAME: {
		enumerable: true,
		value: 'StackedError'
	},
	CODE: {
		enumerable: true,
		value: 'STACKED_ERROR'
	},
	TITLE: {
		enumerable: true,
		value: 'Internal Server Error'
	},
	STATUS_CODE: {
		enumerable: true,
		value: 500
	}
});

module.exports = StackedError;
