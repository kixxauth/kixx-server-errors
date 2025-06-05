import { describe } from 'kixx-test';
import { assert, assertEqual } from 'kixx-assert';
import sinon from 'sinon';
import ValidationError from '../lib/validation-error.js';

describe('ValidationError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new ValidationError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof ValidationError);
        assertEqual(err.message, 'test message');
        assertEqual(err.cause, cause);
    });

    describe('with defaults', () => {
        it('has the default .name property', () => {
            const err = new ValidationError('test message');
            assertEqual(err.name, 'ValidationError');
            assertEqual(ValidationError.name, err.name);
        });

        it('has the default .code property', () => {
            const err = new ValidationError('test message');
            assertEqual(err.code, 'VALIDATION_ERROR');
            assertEqual(ValidationError.CODE, err.code);
        });

        it('has the default .httpStatusCode property', () => {
            const err = new ValidationError('test message');
            assertEqual(err.httpStatusCode, 422);
            assertEqual(ValidationError.HTTP_STATUS_CODE, err.httpStatusCode);
        });

        it('has the default .expected property', () => {
            const err = new ValidationError('test message');
            assertEqual(err.expected, true);
        });

        it('has the default .httpError property', () => {
            const err = new ValidationError('test message');
            assertEqual(err.httpError, true);
        });

        it('has an empty errors array', () => {
            const err = new ValidationError('test message');
            assertEqual(Array.isArray(err.errors), true);
            assertEqual(err.errors.length, 0);
        });
    });

    describe('with custom options', () => {
        it('accepts a custom name', () => {
            const err = new ValidationError('test message', { name: 'CustomError' });
            assertEqual(err.name, 'CustomError');
        });

        it('accepts a custom code', () => {
            const err = new ValidationError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual(err.code, 'CUSTOM_ERROR_CODE');
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new ValidationError('test message', { httpStatusCode: 418 });
            assertEqual(err.httpStatusCode, 418);
            assertEqual(err.httpError, true);
        });

        it('accepts a custom expected flag', () => {
            const err = new ValidationError('test message', { expected: false });
            assertEqual(err.expected, false);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new ValidationError('test message', {
                name: 'CustomError',
                code: 'CUSTOM_ERROR_CODE',
                httpStatusCode: 418,
                expected: false,
            });
            assertEqual(err.name, 'CustomError');
            assertEqual(err.code, 'CUSTOM_ERROR_CODE');
            assertEqual(err.httpStatusCode, 418);
            assertEqual(err.expected, false);
            assertEqual(err.httpError, true);
        });
    });

    describe('error collection', () => {
        it('allows pushing validation errors', () => {
            const err = new ValidationError('test message');
            err.push('Invalid email', 'user.email');
            err.push('Password too short', 'user.password');

            assertEqual(err.errors.length, 2);
            assertEqual(err.length, 2);

            assertEqual(err.errors[0].message, 'Invalid email');
            assertEqual(err.errors[0].source, 'user.email');

            assertEqual(err.errors[1].message, 'Password too short');
            assertEqual(err.errors[1].source, 'user.password');
        });
    });

    // eslint-disable-next-line no-shadow
    describe('when a sourceFunction is provided', ({ before, after, it }) => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
            sandbox.spy(Error, 'captureStackTrace');
        });

        after(() => {
            sandbox.restore();
        });

        it('captures the stack trace', () => {
            const sourceFunction = () => { };
            const err = new ValidationError('test message', null, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
