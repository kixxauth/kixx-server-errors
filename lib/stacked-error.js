'use strict';

class StackedError extends Error {
	constructor(message, spec, sourceFunction) {
		spec = spec || {};
		const err = spec.err;
		let errors = [];

		if (err && Array.isArray(err.errors)) {
			errors = err.errors.slice();
			errors.unshift(err);
		} else if (err) {
			errors = [ err ];
		}

		const composedMessage = errors[0] ? `${ message }: ${ errors[0].message }` : message;

		super(composedMessage);

		const name = this.constructor.NAME || this.constructor.name;

		const detailHistory = errors.map((e) => {
			return `${ e.name }: ${ e.message }`;
		});

		detailHistory.unshift(`${ name }: ${ composedMessage }`);

		Object.defineProperties(this, {
			name: {
				enumerable: true,
				value: name,
			},
			message: {
				enumerable: true,
				value: composedMessage,
			},
			code: {
				enumerable: true,
				value: spec.code || this.constructor.CODE,
			},
			title: {
				enumerable: true,
				value: spec.title || this.constructor.TITLE,
			},
			detail: {
				enumerable: true,
				value: detailHistory.join(' >> '),
			},
			errors: {
				enumerable: true,
				value: Object.freeze(errors),
			},
			location: {
				enumerable: true,
				value: spec.location,
			},
		});

		if (Error.captureStackTrace && sourceFunction) {
			Error.captureStackTrace(this, sourceFunction);
		}
	}
}

module.exports = StackedError;
