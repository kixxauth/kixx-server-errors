'use strict';

const {assert, helpers} = require('kixx-assert');
const {EOL} = require('os');

const ErrorClass = require('../lib/unauthorized-error');

const ERROR_NAME = 'UnauthorizedError';
const ERROR_CODE = 'UNAUTHORIZED_ERROR';
const ERROR_TITLE = 'Unauthorized';
const ERROR_STATUS_CODE = 401;

const {isObject, isEmpty} = helpers;

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

	t.it('should have correct message', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isEqual('Foo bar baz.', err.message);
	});

	t.it('should have correct detail', () => {
		const err = new ErrorClass('Foo bar baz.');
		assert.isEqual('Foo bar baz.', err.detail);
	});

	t.it('should assign the given headers', () => {
		const undef = new ErrorClass('Foo bar baz.');
		const err = new ErrorClass('Foo bar baz.', {headers: {'WWW-Authenticate': 'Basic'}});
		assert.isOk(isObject(undef.headers) && isEmpty(undef.headers));
		assert.isEqual('Basic', err.headers['WWW-Authenticate']);
	});

	t.it('should have a full stack trace', () => {
		const err = new ErrorClass('Foo bar baz.');
		const firstLines = err.stack.split(EOL).slice(0, 2);
		assert.isEqual(`${ERROR_NAME}: Foo bar baz.`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/unauthorized-error-test.js:'));
	});
};
