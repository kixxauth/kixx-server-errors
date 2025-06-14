import { describe } from 'kixx-test';
import { assert, assertEqual } from 'kixx-assert';
import sinon from 'sinon';
import { NotImplementedError } from '../mod.js';

describe('NotImplementedError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new NotImplementedError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof NotImplementedError);
        assertEqual('test message', err.message);
        assertEqual(cause, err.cause);
    });

    // eslint-disable-next-line no-shadow
    describe('with defaults', ({ it }) => {
        it('has the default .name property', () => {
            const err = new NotImplementedError('test message');
            assertEqual('NotImplementedError', err.name);
            assertEqual(NotImplementedError.name, err.name);
        });

        it('has the default .code property', () => {
            const err = new NotImplementedError('test message');
            assertEqual('NOT_IMPLEMENTED_ERROR', err.code);
            assertEqual(NotImplementedError.CODE, err.code);
        });

        it('has the default .httpStatusCode property', () => {
            const err = new NotImplementedError('test message');
            assertEqual(501, err.httpStatusCode);
            assertEqual(NotImplementedError.HTTP_STATUS_CODE, err.httpStatusCode);
        });

        it('has the default .expected property', () => {
            const err = new NotImplementedError('test message');
            assertEqual(true, err.expected);
        });

        it('has the default .httpError property', () => {
            const err = new NotImplementedError('test message');
            assertEqual(true, err.httpError);
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with custom options', ({ it }) => {
        it('accepts a custom name', () => {
            const err = new NotImplementedError('test message', { name: 'CustomError' });
            assertEqual('CustomError', err.name);
        });

        it('accepts a custom code', () => {
            const err = new NotImplementedError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual('CUSTOM_ERROR_CODE', err.code);
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new NotImplementedError('test message', { httpStatusCode: 418 });
            assertEqual(418, err.httpStatusCode);
            assertEqual(true, err.httpError);
        });

        it('accepts a custom expected flag', () => {
            const err = new NotImplementedError('test message', { expected: false });
            assertEqual(false, err.expected);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new NotImplementedError('test message', {
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
            const err = new NotImplementedError('test message', null, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
