import { describe } from 'kixx-test';
import { assert, assertEqual } from 'kixx-assert';
import sinon from 'sinon';
import AssertionError from '../lib/assertion-error.js';

describe('AssertionError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new AssertionError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof AssertionError);
        assertEqual(err.message, 'test message');
        assertEqual(err.cause, cause);
    });

    describe('with defaults', () => {
        it('has the default .name property', () => {
            const err = new AssertionError('test message');
            assertEqual(err.name, 'AssertionError');
            assertEqual(AssertionError.name, err.name);
        });
        it('has the default .code property', () => {
            const err = new AssertionError('test message');
            assertEqual(err.code, 'ASSERTION_ERROR');
            assertEqual(AssertionError.CODE, err.code);
        });
        it('has the default .httpStatusCode property', () => {
            const err = new AssertionError('test message');
            assertEqual('undefined', typeof err.httpStatusCode);
        });
        it('has the default .expected property', () => {
            const err = new AssertionError('test message');
            assertEqual(err.expected, false);
        });
        it('has the default .httpError property', () => {
            const err = new AssertionError('test message');
            assertEqual(err.httpError, false);
        });
    });

    describe('with custom options', () => {
        it('accepts a custom name', () => {
            const err = new AssertionError('test message', { name: 'CustomError' });
            assertEqual(err.name, 'CustomError');
        });

        it('accepts a custom code', () => {
            const err = new AssertionError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual(err.code, 'CUSTOM_ERROR_CODE');
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new AssertionError('test message', { httpStatusCode: 418 });
            assertEqual(err.httpStatusCode, 418);
            assertEqual(err.httpError, true);
        });

        it('accepts a custom expected flag', () => {
            const err = new AssertionError('test message', { expected: true });
            assertEqual(err.expected, true);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new AssertionError('test message', {
                name: 'CustomError',
                code: 'CUSTOM_ERROR_CODE',
                httpStatusCode: 418,
                expected: true,
            });
            assertEqual(err.name, 'CustomError');
            assertEqual(err.code, 'CUSTOM_ERROR_CODE');
            assertEqual(err.httpStatusCode, 418);
            assertEqual(err.expected, true);
            assertEqual(err.httpError, true);
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
            const err = new AssertionError('test message', null, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
