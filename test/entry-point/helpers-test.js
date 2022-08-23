'use strict';

const { EOL } = require('os');
const { assert } = require('kixx-assert');

const {
	getFullStack,
	getHttpError,
} = require('../../index');

module.exports = function runTests(test) {
	test.describe('getFullStack()', (t) => {
		t.it('will handle null or undefined input', () => {
			const stack = getFullStack(null);
			assert.isEqual('Null or undefined error', stack);
		});

		t.it('will handle error with no stack', () => {
			let stack = getFullStack({});

			assert.isEqual('No stack trace', stack);

			stack = getFullStack({
				stack: 'Foo',
				errors: [
					{},
					{ stack: 'Bar' },
				],
			});

			const lines = stack.split(EOL);

			assert.isEqual('Foo', lines[0]);
			assert.isEqual('caused by:', lines[1]);
			assert.isEqual('No stack trace', lines[2]);
			assert.isEqual('caused by:', lines[3]);
			assert.isEqual('Bar', lines[4]);
		});

		t.it('will handle a single error', () => {
			const stack = getFullStack({ stack: 'Foo' });
			assert.isEqual('Foo', stack);
		});

		t.it('will handle an error with a history', () => {
			const stack = getFullStack({
				stack: 'Foo',
				errors: [
					{ stack: 'Bar' },
					{ stack: 'Baz' },
				],
			});

			const lines = stack.split(EOL);
			assert.isEqual('Foo', lines[0]);
			assert.isEqual('caused by:', lines[1]);
			assert.isEqual('Bar', lines[2]);
			assert.isEqual('caused by:', lines[3]);
			assert.isEqual('Baz', lines[4]);
		});
	});

	test.describe('getHttpError()', (t) => {
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
	});
};
