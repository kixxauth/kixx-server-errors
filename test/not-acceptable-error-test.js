import { describe } from 'kixx-test';
import { assert, assertEqual, assertNotEqual } from 'kixx-assert';
import sinon from 'sinon';
import { NotAcceptableError } from '../mod.js';

describe('NotAcceptableError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new NotAcceptableError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof NotAcceptableError);
        assertEqual('test message', err.message);
        assertEqual(cause, err.cause);
    });

    // eslint-disable-next-line no-shadow
    describe('with defaults', ({ it }) => {
        it('has the default .name property', () => {
            const err = new NotAcceptableError('test message');
            assertEqual('NotAcceptableError', err.name);
            assertEqual(NotAcceptableError.name, err.name);
        });

        it('has the default .code property', () => {
            const err = new NotAcceptableError('test message');
            assertEqual('NOT_ACCEPTABLE_ERROR', err.code);
            assertEqual(NotAcceptableError.CODE, err.code);
        });

        it('has the default .httpStatusCode property', () => {
            const err = new NotAcceptableError('test message');
            assertEqual(406, err.httpStatusCode);
            assertEqual(NotAcceptableError.HTTP_STATUS_CODE, err.httpStatusCode);
        });

        it('has the default .expected property', () => {
            const err = new NotAcceptableError('test message');
            assertEqual(true, err.expected);
        });

        it('has the default .httpError property', () => {
            const err = new NotAcceptableError('test message');
            assertEqual(true, err.httpError);
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with custom options', ({ it }) => {
        it('accepts a custom name', () => {
            const err = new NotAcceptableError('test message', { name: 'CustomError' });
            assertEqual('CustomError', err.name);
        });

        it('accepts a custom code', () => {
            const err = new NotAcceptableError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual('CUSTOM_ERROR_CODE', err.code);
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new NotAcceptableError('test message', { httpStatusCode: 418 });
            assertEqual(418, err.httpStatusCode);
            assertEqual(true, err.httpError);
        });

        it('accepts a custom expected flag', () => {
            const err = new NotAcceptableError('test message', { expected: false });
            assertEqual(false, err.expected);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new NotAcceptableError('test message', {
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
    describe('with accept', ({ it }) => {
        it('has an empty array by default', () => {
            const err = new NotAcceptableError('test message');
            assert(Array.isArray(err.accept));
            assertEqual(0, err.accept.length);
        });

        it('accepts an array of accept values', () => {
            const accept = [ 'application/json', 'text/html' ];
            const err = new NotAcceptableError('test message', { accept });
            assert(Array.isArray(err.accept));
            assertEqual(2, err.accept.length);
            assertEqual('application/json', err.accept[0]);
            assertEqual('text/html', err.accept[1]);
        });

        it('makes a copy of the accept array', () => {
            const accept = [ 'application/json', 'text/html' ];
            const err = new NotAcceptableError('test message', { accept });
            assertNotEqual(accept, err.accept);
        });

        it('freezes the accept array', () => {
            const accept = [ 'application/json', 'text/html' ];
            const err = new NotAcceptableError('test message', { accept });
            assert(Object.isFrozen(err.accept));
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with acceptEncoding', ({ it }) => {
        it('has an empty array by default', () => {
            const err = new NotAcceptableError('test message');
            assert(Array.isArray(err.acceptEncoding));
            assertEqual(0, err.acceptEncoding.length);
        });

        it('accepts an array of acceptEncoding values', () => {
            const acceptEncoding = [ 'gzip', 'deflate' ];
            const err = new NotAcceptableError('test message', { acceptEncoding });
            assert(Array.isArray(err.acceptEncoding));
            assertEqual(2, err.acceptEncoding.length);
            assertEqual('gzip', err.acceptEncoding[0]);
            assertEqual('deflate', err.acceptEncoding[1]);
        });

        it('makes a copy of the acceptEncoding array', () => {
            const acceptEncoding = [ 'gzip', 'deflate' ];
            const err = new NotAcceptableError('test message', { acceptEncoding });
            assertNotEqual(acceptEncoding, err.acceptEncoding);
        });

        it('freezes the acceptEncoding array', () => {
            const acceptEncoding = [ 'gzip', 'deflate' ];
            const err = new NotAcceptableError('test message', { acceptEncoding });
            assert(Object.isFrozen(err.acceptEncoding));
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with acceptLanguage', ({ it }) => {
        it('has an empty array by default', () => {
            const err = new NotAcceptableError('test message');
            assert(Array.isArray(err.acceptLanguage));
            assertEqual(0, err.acceptLanguage.length);
        });

        it('accepts an array of acceptLanguage values', () => {
            const acceptLanguage = [ 'en-US', 'en-GB' ];
            const err = new NotAcceptableError('test message', { acceptLanguage });
            assert(Array.isArray(err.acceptLanguage));
            assertEqual(2, err.acceptLanguage.length);
        });

        it('makes a copy of the acceptLanguage array', () => {
            const acceptLanguage = [ 'en-US', 'en-GB' ];
            const err = new NotAcceptableError('test message', { acceptLanguage });
            assertNotEqual(acceptLanguage, err.acceptLanguage);
        });

        it('freezes the acceptLanguage array', () => {
            const acceptLanguage = [ 'en-US', 'en-GB' ];
            const err = new NotAcceptableError('test message', { acceptLanguage });
            assert(Object.isFrozen(err.acceptLanguage));
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
            const err = new NotAcceptableError('test message', null, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
