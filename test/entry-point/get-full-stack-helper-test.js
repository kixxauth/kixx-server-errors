'use strict';

const { EOL } = require('os');
const { assert } = require('kixx-assert');

const { getFullStack } = require('../../index');

module.exports = function runTests(t) {
	t.it('will handle null or undefined input', () => {
		const stack = getFullStack(null);
		assert.isEqual('Null or undefined error', stack);
	});

	t.it('will handle error with no stack', () => {
		let stack = getFullStack({});

		assert.isEqual('No stack trace', stack);

		stack = getFullStack({
			stack: 'Foo',
			cause: { cause: { stack: 'Bar' } },
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
			cause: {
				stack: 'Bar',
				cause: { stack: 'Baz' },
			},
		});

		const lines = stack.split(EOL);
		assert.isEqual('Foo', lines[0]);
		assert.isEqual('caused by:', lines[1]);
		assert.isEqual('Bar', lines[2]);
		assert.isEqual('caused by:', lines[3]);
		assert.isEqual('Baz', lines[4]);
	});
};
