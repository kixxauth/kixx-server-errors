'use strict';

const {assert} = require('kixx-assert');

const {
	getFullStack,
	includesErrorCode,
	getOperationalError
} = require('../../index');

module.exports = function (t) {
	t.describe('getFullStack()', (t) => {
		t.describe('with proxy', (t) => {
			let proxyIsCalled = false;

			const err = {
				getFullStack() {
					proxyIsCalled = true;
					return 'proxied-foo';
				},
				stack: 'foo'
			};

			t.it('should call the proxy', (t) => {
				const stack = getFullStack(err);

				assert.isEqual(true, proxyIsCalled);
				assert.isEqual('proxied-foo', stack);
			});
		});

		t.describe('with prop', (t) => {
			const err = {
				getFullStack: {},
				stack: 'foo'
			};

			t.it('should reference the stack property', (t) => {
				const stack = getFullStack(err);
				assert.isEqual('foo', stack);
			});
		});

		t.describe('without prop', (t) => {
			const err = {stack: 'foo'};

			t.it('should reference the stack property', (t) => {
				const stack = getFullStack(err);
				assert.isEqual('foo', stack);
			});
		});
	});

	t.describe('includesErrorCode()', (t) => {
		t.describe('with proxy', (t) => {
			let proxyIsCalled = false;

			const err = {
				includesErrorCode() {
					proxyIsCalled = true;
					return true;
				},
				code: 'bar'
			};

			t.it('should call the proxy', (t) => {
				const res = includesErrorCode(err, 'foo');

				assert.isEqual(true, proxyIsCalled);
				assert.isEqual(true, res);
			});
		});

		t.describe('without proxy', (t) => {
			t.it('searches for given code', () => {
				const err = {code: 'FOO'};
				assert.isEqual('FOO', includesErrorCode(err, 'FOO'));
			});

			t.it('finds given Error codes', (t) => {
				const err1 = {code: 'ONE'};
				const err2 = {code: 'TWO'};
				const err3 = {code: 'THREE'};
				const finalErr = {code: 'FOUR', errors: [err1, err2, err3]};

				assert.isEqual('ONE', includesErrorCode(finalErr, 'ONE'));
				assert.isEqual('TWO', includesErrorCode(finalErr, 'TWO'));
				assert.isEqual('THREE', includesErrorCode(finalErr, 'THREE'));
				assert.isEqual('FOUR', includesErrorCode(finalErr, 'FOUR'));
			});

			t.it('returns false when Error codes are not found', () => {
				const err = {code: 'foo'};
				assert.isEqual(false, includesErrorCode(err, 'bar'));
			});
		});
	});

	t.describe('getOperationalError()', (t) => {
		t.describe('with proxy', (t) => {
			let proxyIsCalled = false;

			const err = {
				getOperationalError() {
					proxyIsCalled = true;
					return 1;
				},
				code: 'bar'
			};

			t.it('should call the proxy', (t) => {
				const res = getOperationalError(err);

				assert.isEqual(true, proxyIsCalled);
				assert.isEqual(1, res);
			});
		});

		t.describe('without proxy', (t) => {
			t.it('finds the first error with a status code', () => {
				const err1 = {};
				const err2 = {statusCode: 100};
				const err3 = {statusCode: 200};
				const finalErr = {statusCode: 300, errors: [err3, err2, err1]};

				assert.isEqual(err2, getOperationalError(finalErr));
			});

			t.it('returns self if no nested operational error', () => {
				const err1 = {};
				const finalErr = {errors: [err1]};

				assert.isEqual(finalErr, getOperationalError(finalErr));
			});
		});
	});
};
