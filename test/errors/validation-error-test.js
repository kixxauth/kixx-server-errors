'use strict';

const { assert } = require('kixx-assert');
const { EOL } = require('os');

const ErrorClass = require('../../lib/errors/validation-error');
const UnprocessableError = require('../../lib/errors/unprocessable-error');

const ERROR_NAME = 'ValidationError';
const ERROR_CODE = 'VALIDATION_ERROR_CONTAINER';
const ERROR_TITLE = 'Validation Error';
const ERROR_STATUS_CODE = 400;

module.exports = function runTest(t) {
	t.it('should be an instance of an Error', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isOk(err instanceof Error);
	});

	t.it('should be an instance of a StackedError', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isOk(err instanceof Error);
	});

	t.it('should have correct name', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isNonEmptyString(ERROR_NAME);
		assert.isEqual(ERROR_NAME, ErrorClass.NAME);
		assert.isEqual(ErrorClass.NAME, err.name);
	});

	t.it('should have default code when none provided', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isNonEmptyString(ERROR_CODE);
		assert.isEqual(ERROR_CODE, ErrorClass.CODE);
		assert.isEqual(ErrorClass.CODE, err.code);
	});

	t.it('should have code when provided', () => {
		const err = new ErrorClass('Foo bar baz.', { code: 1234 });
		assert.isEqual(1234, err.code);
	});

	t.it('should use err.code when code is NOT provided', () => {
		const err = new ErrorClass('Foo bar baz.', { code: 'fu' });
		assert.isEqual('fu', err.code);
	});

	t.it('should have correct title', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isNonEmptyString(ERROR_TITLE);
		assert.isEqual(ERROR_TITLE, ErrorClass.TITLE);
		assert.isEqual(ErrorClass.TITLE, err.title);
	});

	t.it('should have correct statusCode', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isEqual(ERROR_STATUS_CODE, ErrorClass.STATUS_CODE);
		assert.isEqual(ErrorClass.STATUS_CODE, err.statusCode);
	});

	t.it('should have correct message with NO root errors', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isEqual('Foo bar baz.', err.message);
	});

	t.it('should have correct message WITH root errors', () => {
		const firstError = new Error('Foo');
		const secondError = new ErrorClass('Bar', { cause: firstError });
		const err = new ErrorClass('Baz', { cause: secondError });
		assert.isEqual('Baz', err.message);
	});

	t.it('should have correct "fatal" flag', () => {
		let err = new ErrorClass('Foo');
		assert.isEqual(false, err.fatal);
		err = new ErrorClass('Foo', { fatal: true });
		assert.isEqual(true, err.fatal);
	});

	t.it('should have a stack trace', () => {
		const firstError = new Error('Foo');
		const secondError = new ErrorClass('Bar', { cause: firstError });
		const err = new ErrorClass('Baz', { cause: secondError });

		const firstLines = err.stack.split(EOL).slice(0, 2);

		assert.isEqual(`${ ERROR_NAME }: Baz`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/errors/validation-error-test.js:'));
	});

	t.it('should have a detail property', () => {
		const firstError = new Error('Foo');
		const secondError = new ErrorClass('Bar', { cause: firstError });
		const err = new ErrorClass('Baz', { cause: secondError });

		assert.isEqual(`${ ERROR_NAME } ${ ERROR_CODE } Baz => ${ ERROR_NAME } ${ ERROR_CODE } Bar => Error Foo`, err.detail);
	});

	t.it('pushes and checks UnprocessableErrors', () => {
		const err = new ErrorClass();

		// We get null when there are no errors.
		assert.isEqual(null, err.withErrorsOrNull());

		err.push('Invalid username', 'username', 'foo');
		err.push('Invalid password', 'password', 'bar');

		// Returns the ValidationError when errors are present.
		assert.isEqual(err, err.withErrorsOrNull());

		const err1 = err.unprocessableErrors[0];
		const err2 = err.unprocessableErrors[1];

		assert.isEqual(UnprocessableError.NAME, err1.name);
		assert.isEqual(UnprocessableError.NAME, err2.name);

		assert.isEqual(UnprocessableError.CODE, err1.code);
		assert.isEqual(UnprocessableError.CODE, err2.code);

		assert.isEqual('Invalid username', err1.message);
		assert.isEqual('Invalid password', err2.message);

		assert.isEqual('username', err1.info.pointer);
		assert.isEqual('foo', err1.info.value);
		assert.isEqual('password', err2.info.pointer);
		assert.isEqual('bar', err2.info.value);
	});
};
