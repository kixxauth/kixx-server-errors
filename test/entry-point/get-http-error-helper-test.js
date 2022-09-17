'use strict';

const { assert } = require('kixx-assert');

const { getHttpError } = require('../../index');

module.exports = function runTests(t) {
	t.it('will handle null or undefined input', () => {
		const res = getHttpError(null);
		assert.isEqual(null, res);
	});

	t.it('will handle error with no status code', () => {
		const err = {
			errors: [
				new Error('Foo'),
				new Error('Bar'),
			],
		};

		const res = getHttpError(err);

		assert.isEqual(null, res);
	});

	t.it('will handle a single error', () => {
		let err = new Error('Foo');
		// WITHOUT a status code
		let res = getHttpError(err);

		assert.isEqual(null, res);

		err = new Error('Bar');
		err.statusCode = 1;
		// WITH a code
		res = getHttpError(err);

		// Returns self.
		assert.isEqual(err, res);
	});

	t.it('will handle an error with a history', () => {
		const firstError = new Error('Baz');
		firstError.statusCode = 1;

		const err = {
			statusCode: 1,
			errors: [
				new Error('Bar'),
				firstError,
			],
		};

		// Returns the most recent error; the one closest in the list.
		const res = getHttpError(err);

		assert.isEqual(err, res);
	});
};
