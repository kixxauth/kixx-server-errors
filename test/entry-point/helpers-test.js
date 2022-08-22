'use strict';

const { EOL } = require('os');
const { assert } = require('kixx-assert');

const {
	StackedError,
	getFullStack,
	includesErrorCode,
	getOperationalError,
	getFirstStackedError,
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

	test.describe('includesErrorCode()', (t) => {
		t.it('will handle null or undefined input', () => {
			assert.isEqual(false, includesErrorCode(null));
		});

		t.it('will handle error with no code', () => {
			let res = includesErrorCode({}, 'ANY');

			assert.isEqual(false, res);

			res = includesErrorCode({
				code: 'Foo',
				errors: [
					{},
					{ code: 'Bar' },
				],
			}, 'ANY');

			assert.isEqual(false, res);
		});

		t.it('will handle a single error', () => {
			let res = includesErrorCode({ code: 'Foo' }, 'Bar');
			assert.isEqual(false, res);
			res = includesErrorCode({ code: 'Bar' }, 'Bar');
			assert.isEqual(true, res);
		});

		t.it('will handle an error with a history', () => {
			const res = includesErrorCode({
				code: 'Foo',
				errors: [
					{ code: 'Bar' },
					{ code: 'Baz' },
				],
			}, 'Bar');

			assert.isEqual(true, res);
		});
	});

	test.describe('getOperationalError()', (t) => {
		t.it('will handle null or undefined input', () => {
			const res = getOperationalError(null);
			assert.isEqual(null, res);
		});

		t.it('will handle error with no code', () => {
			const err = {
				errors: [
					new Error('Foo'),
					new Error('Bar'),
				],
			};

			const res = getOperationalError(err);

			assert.isEqual(err, res);
		});

		t.it('will handle a single error', () => {
			let err = new Error('Foo');
			// WITHOUT a code
			let res = getOperationalError(err);

			// Returns self.
			assert.isEqual(err, res);

			err = new Error('Bar');
			err.code = 1;
			// WITH a code
			res = getOperationalError(err);

			// Returns self.
			assert.isEqual(err, res);
		});

		t.it('will handle an error with a history', () => {
			const firstError = new Error('Baz');
			firstError.code = 1;

			const err = {
				code: 1,
				errors: [
					new Error('Bar'),
					firstError,
				],
			};

			// Returns the first error; the one furthest back in the list.
			const res = getOperationalError(err);

			assert.isEqual(firstError, res);
		});
	});

	test.describe('getFirstStackedError()', (t) => {
		t.it('will handle null or undefined input', () => {
			const res = getFirstStackedError(null);
			assert.isEqual(null, res);
		});

		t.it('will handle native Error', () => {
			const err = {
				errors: [
					new Error('Foo'),
					new Error('Bar'),
				],
			};

			// Returns self.
			const res = getFirstStackedError(err);

			assert.isEqual(err, res);
		});

		t.it('will handle a single error', () => {
			let err = new Error('Foo');
			// WITHOUT a StackedError
			let res = getFirstStackedError(err);

			// Returns self.
			assert.isEqual(err, res);

			err = new StackedError('SomeError', 'error!!');
			// WITH a StackedError
			res = getOperationalError(err);

			// Returns self.
			assert.isEqual(err, res);
		});

		t.it('will handle an error with a history', () => {
			const firstError = new StackedError('SomeError', 'error!!');

			const err = new StackedError('SomeError', 'error!!', {
				err: {
					errors: [
						new Error('Bar'),
						firstError,
					],
				},
			});

			// Returns the first error; the one furthest back in the list.
			const res = getFirstStackedError(err);

			assert.isEqual(firstError, res);
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
