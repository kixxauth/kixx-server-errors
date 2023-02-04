'use strict';

const { assert } = require('kixx-assert');

const {
	ProgrammerError,
	OperationalError,
	ValidationError,
	isProgrammerError,
} = require('../../index');

module.exports = function runTests(t) {
	t.it('will handle null or undefined input', () => {
		assert.isEqual(false, isProgrammerError(null));
	});

	t.it('will detect primary ProgrammerError error as programmer error', () => {
		const err = new ProgrammerError();
		assert.isEqual(true, isProgrammerError(err));
	});

	t.it('will detect pseudo ProgrammerError error as programmer error', () => {
		const err = { name: 'ProgrammerError' };
		assert.isEqual(true, isProgrammerError(err));
	});

	t.it('returns false when primary error is not a ProgrammerError', () => {
		const err = new OperationalError();
		assert.isEqual(false, isProgrammerError(err));
	});

	t.it('will detect nested ProgrammerError error as programmer error', () => {
		const cause = new ValidationError('cause1', { cause: new ProgrammerError('cause2') });
		const err = new OperationalError('parent', { cause });
		assert.isEqual(true, isProgrammerError(err));
	});
};
