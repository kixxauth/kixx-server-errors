'use strict';

const {assert} = require('kixx-assert');
const {EOL} = require('os');

const ErrorClass = require('../lib/user-error');

const ERROR_NAME = 'UserError';
const ERROR_CODE = 'USER_ERROR';

module.exports = function (t) {
	t.it('should be an instance of an Error', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isOk(err instanceof Error);
	});

	t.it('should have correct name', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isNonEmptyString(ERROR_NAME);
		assert.isEqual(ERROR_NAME, ErrorClass.NAME);
		assert.isEqual(ErrorClass.NAME, err.name);
	});

	t.it('should have correct code', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isNonEmptyString(ERROR_CODE);
		assert.isEqual(ERROR_CODE, ErrorClass.CODE);
		assert.isEqual(ErrorClass.CODE, err.code);
	});

	t.it('should have correct message', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isEqual('Foo bar baz.', err.message);
	});

	t.it('should have a full stack trace', () => {
		const err = new ErrorClass('Foo bar baz.');
		const firstLines = err.stack.split(EOL).slice(0, 2);
		assert.isEqual(`${ERROR_NAME}: Foo bar baz.`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/user-error-test.js:'));
	});

	t.it('should have configurable stack trace', () => {
		function insideFunction() {
			const err = new ErrorClass('Foo bar baz.', insideFunction);
			const firstLines = err.stack.split(EOL).slice(0, 2);
			assert.isEqual(`${ERROR_NAME}: Foo bar baz.`, firstLines[0]);
			assert.isOk(firstLines[1].includes('test/user-error-test.js:'));
			assert.isNotOk(firstLines[1].includes('at insideFunction'));
		}

		insideFunction();
	});
};
