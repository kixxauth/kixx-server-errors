'use strict';

class StackedError extends Error {

	constructor(message, spec, sourceFunction) {
		super(message);

		spec = spec || {};

		const name = this.constructor.NAME || this.constructor.name;

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: name,
			},
			message: {
				enumerable: true,
				value: message,
			},
			code: {
				enumerable: true,
				value: spec.code || this.constructor.CODE,
			},
			title: {
				enumerable: true,
				value: spec.title || this.constructor.TITLE,
			},
			fatal: {
				enumerable: true,
				value: Boolean(spec.fatal),
			},
			cause: {
				enumerable: true,
				value: spec.cause,
			},
			info: {
				enumerable: true,
				value: Object.assign({}, spec.info || {}),
			},
		});

		if (Error.captureStackTrace && sourceFunction) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}

	get detail() {
		const details = [];

		function recurseCauses(cause) {
			if (typeof cause.name === 'string') {
				if (typeof cause.message === 'string') {
					details.push(`${ cause.name }: ${ cause.message }`);
				} else {
					details.push(cause.name);
				}
			} else if (typeof cause.message === 'string') {
				details.push(cause.message);
			}

			if (cause.cause) {
				recurseCauses(cause.cause);
			}
		}

		recurseCauses(this);

		return details.join(' => ');
	}
}

module.exports = StackedError;
