import { describe } from 'kixx-test';
import { assert, assertEqual } from 'kixx-assert';
import WrappedError from '../lib/wrapped-error.js';

describe('WrappedError', ({ it, describe }) => { // eslint-disable-line no-shadow

    it('creates instances inherited from the native Error', () => {
        const cause = new Error('test cause');
        const err = new WrappedError('test message', { cause });
        assert(err instanceof Error);
        assert(err instanceof WrappedError);
        assertEqual(err.message, 'test message');
        assertEqual(err.cause, cause);
    });

    describe('with defaults', () => {
        it('has the default .name property');
        it('has the default .code property');
        it('has the default .httpStatusCode property');
        it('has the default .expected property');
        it('has the default .httpError property');
    });
});
