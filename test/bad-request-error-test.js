'use strict';

const {assert} = require('kixx-assert');

module.exports = function (t) {
	t.it('should not be smoking', () => {
		assert.isOk(false, 'smoking');
	});
};
