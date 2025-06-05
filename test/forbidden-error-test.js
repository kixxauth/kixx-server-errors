import { describe } from 'kixx-test';
import { assert, assertEqual } from 'kixx-assert';
import sinon from 'sinon';
import { ForbiddenError } from '../mod.js';

describe('ForbiddenError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new ForbiddenError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof ForbiddenError);
        assertEqual('test message', err.message);
        assertEqual(cause, err.cause);
    });

    // eslint-disable-next-line no-shadow
    describe('with defaults', ({ it }) => {
        it('has the default .name property', () => {
            const err = new ForbiddenError('test message');
            assertEqual('ForbiddenError', err.name);
            assertEqual(ForbiddenError.name, err.name);
        });

        it('has the default .code property', () => {
            const err = new ForbiddenError('test message');
            assertEqual('FORBIDDEN_ERROR', err.code);
            assertEqual(ForbiddenError.CODE, err.code);
        });

        it('has the default .httpStatusCode property', () => {
            const err = new ForbiddenError('test message');
            assertEqual(403, err.httpStatusCode);
            assertEqual(ForbiddenError.HTTP_STATUS_CODE, err.httpStatusCode);
        });

        it('has the default .expected property', () => {
            const err = new ForbiddenError('test message');
            assertEqual(true, err.expected);
        });

        it('has the default .httpError property', () => {
            const err = new ForbiddenError('test message');
            assertEqual(true, err.httpError);
        });
    });

    // eslint-disable-next-line no-shadow
    describe('with custom options', ({ it }) => {
        it('accepts a custom name', () => {
            const err = new ForbiddenError('test message', { name: 'CustomError' });
            assertEqual('CustomError', err.name);
        });

        it('accepts a custom code', () => {
            const err = new ForbiddenError('test message', { code: 'CUSTOM_ERROR_CODE' });
            assertEqual('CUSTOM_ERROR_CODE', err.code);
        });

        it('accepts a custom httpStatusCode', () => {
            const err = new ForbiddenError('test message', { httpStatusCode: 418 });
            assertEqual(418, err.httpStatusCode);
            assertEqual(true, err.httpError);
        });

        it('accepts a custom expected flag', () => {
            const err = new ForbiddenError('test message', { expected: true });
            assertEqual(true, err.expected);
        });

        it('accepts multiple custom options simultaneously', () => {
            const err = new ForbiddenError('test message', {
                name: 'CustomError',
                code: 'CUSTOM_ERROR_CODE',
                httpStatusCode: 418,
                expected: true,
            });
            assertEqual('CustomError', err.name);
            assertEqual('CUSTOM_ERROR_CODE', err.code);
            assertEqual(418, err.httpStatusCode);
            assertEqual(true, err.expected);
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
            const err = new ForbiddenError('test message', {}, sourceFunction);
            assertEqual(1, Error.captureStackTrace.callCount);
            assertEqual(err, Error.captureStackTrace.firstCall.args[0]);
            assertEqual(sourceFunction, Error.captureStackTrace.firstCall.args[1]);
        });
    });
});
