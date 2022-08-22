'use strict';

class StackedError extends Error {
	constructor(name, message, spec) {
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

		const detailHistory = errors.map((e) => {
			return `${ e.name }: ${ e.message }`;
		});

		detailHistory.unshift(`${ name }: ${ composedMessage }`);

		Object.defineProperties(this, {
			message: {
				enumerable: true,
				value: composedMessage,
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

		if (Error.captureStackTrace && spec.sourceFunction) {
			Error.captureStackTrace(this, spec.sourceFunction);
		}
	}
}

module.exports = StackedError;
