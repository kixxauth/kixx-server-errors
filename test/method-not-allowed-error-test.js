import { describe } from 'kixx-test';
import { assert, assertEqual, assertNotEqual } from 'kixx-assert';
import sinon from 'sinon';
import MethodNotAllowedError from '../lib/method-not-allowed-error.js';

describe('MethodNotAllowedError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new MethodNotAllowedError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof MethodNotAllowedError);
        assertEqual('test message', err.message);
        assertEqual(cause, err.cause);
    });

    // eslint-disable-next-line no-shadow
    describe('with defaults', ({ it }) => {
        it('has the default .name property', () => {
            const err = new MethodNotAllowedError('test message');
            assertEqual('MethodNotAllowedError', err.name);
            assertEqual(MethodNotAllowedError.name, err.name);
        });

        it('has the default .code property', () => {
            const err = new MethodNotAllowedError('test message');
            assertEqual('METHOD_NOT_ALLOWED_ERROR', err.code);
            assertEqual(MethodNotAllowedError.CODE, err.code);
        });

        it('has the default .httpStatusCode property', () => {
            const err = new MethodNotAllowedError('test message');
            assertEqual(405, err.httpStatusCode);
            assertEqual(MethodNotAllowedError.HTTP_STATUS_CODE, err.httpStatusCode);
        });

        it('has the default .expected property', () => {
            const err = new MethodNotAllowedError('test message');
            assertEqual(true, err.expected);
        });

        it('has the default .httpError property', () => {
            const err = new MethodNotAllowedError('test message');
            assertEqual(true, err.httpError);
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with allowed methods', ({ it }) => {
        it('has an empty array by default', () => {
            const err = new MethodNotAllowedError('test message');
            assert(Array.isArray(err.allowedMethods));
            assertEqual(0, err.allowedMethods.length);
        });

        it('accepts an array of allowed methods', () => {
            const allowedMethods = [ 'GET', 'POST' ];
            const err = new MethodNotAllowedError('test message', { allowedMethods });
            assert(Array.isArray(err.allowedMethods));
            assertEqual(2, err.allowedMethods.length);
            assertEqual('GET', err.allowedMethods[0]);
            assertEqual('POST', err.allowedMethods[1]);
        });

        it('makes a copy of the allowed methods array', () => {
            const allowedMethods = [ 'GET', 'POST' ];
            const err = new MethodNotAllowedError('test message', { allowedMethods });
            assertNotEqual(allowedMethods, err.allowedMethods);
        });

        it('freezes the allowed methods array', () => {
            const allowedMethods = [ 'GET', 'POST' ];
            const err = new MethodNotAllowedError('test message', { allowedMethods });
            assert(Object.isFrozen(err.allowedMethods));
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with custom options', ({ it }) => {
        it('accepts a custom name', () => {
            const err = new MethodNotAllowedError('test message', { name: 'CustomError' });
            assertEqual('CustomError', err.name);
        });

        it('accepts a custom code', () => {
            const err = new MethodNotAllowedError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual('CUSTOM_ERROR_CODE', err.code);
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new MethodNotAllowedError('test message', { httpStatusCode: 418 });
            assertEqual(418, err.httpStatusCode);
            assertEqual(true, err.httpError);
        });

        it('accepts a custom expected flag', () => {
            const err = new MethodNotAllowedError('test message', { expected: false });
            assertEqual(false, err.expected);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new MethodNotAllowedError('test message', {
                name: 'CustomError',
                code: 'CUSTOM_ERROR_CODE',
                httpStatusCode: 418,
                expected: false,
            });
            assertEqual('CustomError', err.name);
            assertEqual('CUSTOM_ERROR_CODE', err.code);
            assertEqual(418, err.httpStatusCode);
            assertEqual(false, err.expected);
            assertEqual(true, err.httpError);
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
            const err = new MethodNotAllowedError('test message', null, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
