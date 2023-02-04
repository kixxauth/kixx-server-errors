'use strict';

const { assert } = require('kixx-assert');
const { EOL } = require('os');

const ErrorClass = require('../../lib/errors/bad-request-error');

const ERROR_NAME = 'BadRequestError';
const ERROR_CODE = 'BAD_REQUEST_ERROR';
const ERROR_TITLE = 'Bad Request';
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

	t.it('should have a stack trace', () => {
		const firstError = new Error('Foo');
		const secondError = new ErrorClass('Bar', { cause: firstError });
		const err = new ErrorClass('Baz', { cause: secondError });

		const firstLines = err.stack.split(EOL).slice(0, 2);

		assert.isEqual(`${ ERROR_NAME }: Baz`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/errors/bad-request-error-test.js:'));
	});

	t.it('should have a detail property', () => {
		const firstError = new Error('Foo');
		const secondError = new ErrorClass('Bar', { cause: firstError });
		const err = new ErrorClass('Baz', { cause: secondError });

		assert.isEqual(`${ ERROR_NAME }: Baz => ${ ERROR_NAME }: Bar => Error: Foo`, err.detail);
	});
};
