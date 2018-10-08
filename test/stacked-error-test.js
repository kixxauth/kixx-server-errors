'use strict';

const {assert} = require('kixx-assert');
const {EOL} = require('os');

const ErrorClass = require('../lib/stacked-error');
const ConflictError = require('../lib/conflict-error');

const ERROR_NAME = 'StackedError';
const ERROR_CODE = 'STACKED_ERROR';
const ERROR_TITLE = 'Internal Server Error';
const ERROR_STATUS_CODE = 500;

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

	t.it('should have a full stack trace', () => {
		const err = new ErrorClass('Foo bar baz.');
		const firstLines = err.stack.split(EOL).slice(0, 2);
		assert.isEqual(`${ERROR_NAME}: Foo bar baz.`, firstLines[0]);
		assert.isOk(firstLines[1].includes('test/stacked-error-test.js:'));
	});

	t.it('should have configurable stack trace', () => {
		function insideFunction() {
			const err = new ErrorClass('Foo bar baz.', null, insideFunction);
			const firstLines = err.stack.split(EOL).slice(0, 2);
			assert.isEqual(`${ERROR_NAME}: Foo bar baz.`, firstLines[0]);
			assert.isOk(firstLines[1].includes('test/stacked-error-test.js:'));
			assert.isNotOk(firstLines[1].includes('at insideFunction'));
		}

		insideFunction();
	});

	t.it('appends messages', () => {
		const err1 = new Error('The root cause');
		const err2 = new ErrorClass('Logic layer 2', err1);
		const finalErr = new ErrorClass('Final', err2);

		assert.isEqual('Final: Logic layer 2: The root cause', finalErr.message);
	});

	t.it('uses the latest error message as detail', () => {
		const err1 = new Error('The root cause');
		const err2 = new ErrorClass('Logic layer 2', err1);
		const finalErr = new ErrorClass('Final', err2);

		assert.isEqual('Final', finalErr.detail);
	});

	t.describe('#getFullStack()', (t) => {
		t.it('can compose the underlying stack trace', () => {
			const err1 = new Error('The root cause');
			const err2 = new ErrorClass('Logic layer 2', err1);
			const finalErr = new ErrorClass('Final', err2);
			const stack = finalErr.getFullStack();

			const lines = stack.split(EOL);

			const headers = [lines.shift()];
			const stackLines = [lines.shift()];

			lines.forEach((line, index) => {
				if (line === 'caused by:') {
					headers.push(lines[index + 1]);
					stackLines.push(lines[index + 2]);
				}
			});

			assert.isEqual(3, headers.length);
			assert.isEqual(3, stackLines.length);

			assert.isEqual('StackedError: Final: Logic layer 2: The root cause', headers[0]);
			assert.isEqual('StackedError: Logic layer 2: The root cause', headers[1]);
			assert.isEqual('Error: The root cause', headers[2]);

			// process.stdout.write(`\nline[0]: ${stackLines[0]}\n`);
			assert.isOk(stackLines[0].includes('test/stacked-error-test.js:96'));
			assert.isOk(stackLines[1].includes('test/stacked-error-test.js:95'));
			assert.isOk(stackLines[2].includes('test/stacked-error-test.js:94'));
		});
	});

	t.describe('#includesErrorCode()', (t) => {
		t.it('searches for STACKED_ERROR', () => {
			const err = new ErrorClass('Final');
			assert.isEqual('STACKED_ERROR', err.includesErrorCode('STACKED_ERROR'));
		});

		t.it('finds given Error codes', (t) => {
			const err1 = new Error('The root cause');
			err1.code = 'FOO_BAR_BAZ';
			const err2 = new ConflictError('A conflict error');
			const err3 = new ErrorClass('Intermediate error', [err1, err2]);
			const finalErr = new ErrorClass('Final', err3);

			assert.isEqual('FOO_BAR_BAZ', finalErr.includesErrorCode('FOO_BAR_BAZ'));
			assert.isEqual('CONFLICT_ERROR', finalErr.includesErrorCode(ConflictError.CODE));
			assert.isEqual('STACKED_ERROR', finalErr.includesErrorCode(ErrorClass.CODE));
		});

		t.it('returns false when Error codes are not found', () => {
			const err = new ErrorClass('Final');
			assert.isEqual(false, err.includesErrorCode('FOOBAR'));
		});

	});

	t.describe('#getOperationalError()', (t) => {
		t.it('finds the first error with a status code', () => {
			const err1 = new Error('The root cause');
			const err2 = new ConflictError('A conflict error');
			const err3 = new ErrorClass('Intermediate error', [err1, err2]);
			const finalErr = new ErrorClass('Final', err3);

			assert.isEqual(err2, finalErr.getOperationalError());
		});

		t.it('returns self if no nested operational error', () => {
			const err1 = new Error('The root cause');
			const finalErr = new ErrorClass('Final', err1);

			assert.isEqual(finalErr, finalErr.getOperationalError());
		});
	});
};
