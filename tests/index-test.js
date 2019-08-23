'use strict';

const assert = require('assert');
const { StatusMapper } = require('../lib');
const PackageExport = require('..');

describe('Index', () => {

	describe('Package export', () => {

		it('Should export the StatusMapper class', () => {
			assert.strictEqual(PackageExport, StatusMapper);
		});
	});
});
