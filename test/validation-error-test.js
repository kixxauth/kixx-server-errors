'use strict';

const {assert} = require('kixx-assert');
const {EOL} = require('os');

const ErrorClass = require('../lib/validation-error');
const UnprocessableError = require('../lib/unprocessable-error');

const ERROR_NAME = 'ValidationError';
const ERROR_CODE = 'VALIDATION_ERROR_CONTAINER';

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
		assert.isEqual('List of validation errors', err.message);
	});

	t.it('should have a full stack trace', () => {
		const err = new ErrorClass('Foo bar baz.');
		const firstLines = err.stack.split(EOL).slice(0, 2);
		assert.isEqual(`${ERROR_NAME}: List of validation errors`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/validation-error-test.js:'));
	});

	t.it('pushes and checks UnprocessableErrors', () => {
		const err = new ErrorClass();

		assert.isEqual(null, err.withErrorsOrNull());

		err.push('Invalid username', 'username');
		err.push('Invalid password', 'password');

		assert.isEqual(err, err.withErrorsOrNull());

		const err1 = err.errors[0];
		const err2 = err.errors[1];

		assert.isEqual(UnprocessableError.NAME, err1.name);
		assert.isEqual(UnprocessableError.NAME, err2.name);

		assert.isEqual(UnprocessableError.CODE, err1.code);
		assert.isEqual(UnprocessableError.CODE, err2.code);

		assert.isEqual('Invalid username', err1.detail);
		assert.isEqual('Invalid password', err2.detail);

		assert.isEqual('username', err1.pointer);
		assert.isEqual('password', err2.pointer);
	});
};
