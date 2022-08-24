'use strict';

const { assert } = require('kixx-assert');

const { getMergedInfo } = require('../../index');

module.exports = function runTests(t) {
	t.it('will handle null or undefined input', () => {
		const res = getMergedInfo(null);
		assert.isEqual('object', typeof res);
		assert.isNotEqual(null, res);
		assert.isEmpty(res);
	});

	t.it('returns a copy of the error info property', () => {
		const err = { info: { foo: 'bar', baz: 1 } };
		const info = getMergedInfo(err);

		assert.isNotEqual(err.info, info);
		assert.isEqual(2, Object.keys(info).length);
		assert.isEqual('bar', info.foo);
		assert.isEqual(1, info.baz);
	});

	t.it('merges error info from the errors list', () => {
		const err = {
			info: { foo: 3, three: 'x' },
			errors: [
				{ info: { foo: 2, one: 'z' } },
				{},
				{ info: { foo: 1, two: 'y' } },
			],
		};

		const info = getMergedInfo(err);

		assert.isEqual(4, Object.keys(info).length);
		// The most recent error takes precedent.
		assert.isEqual(3, info.foo);
		assert.isEqual('x', info.three);
		assert.isEqual('y', info.two);
		assert.isEqual('z', info.one);
	});
};
