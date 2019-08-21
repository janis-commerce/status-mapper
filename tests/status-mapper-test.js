'use strict';

const assert = require('assert');

const { StatusMapper, StatusMapperError } = require('./../lib');

describe('StatusMapper', () => {

	describe('map', () => {

		it('Should return undefined if a status name is not found', () => {
			assert.strictEqual(StatusMapper.map('some-unknown-status-name'), StatusMapperError.NOT_EXIST);
		});

		it('Should return undefined if a status ID is not found', () => {
			assert.strictEqual(StatusMapper.map(9999), StatusMapperError.NOT_EXIST);
		});

		it('Should return the status ID if a valid status name not found', () => {
			assert.strictEqual(StatusMapper.map('active'), 1);
		});

		it('Should return the status name if a valid status ID not found', () => {
			assert.strictEqual(StatusMapper.map(1), 'active');
		});

	});

	describe('mapToColor', () => {

		it('Should return undefined if a status name is not found', () => {
			assert.strictEqual(StatusMapper.mapToColor('some-unknown-status-name'), StatusMapperError.NOT_EXIST);
		});

		it('Should return undefined if a status ID is not found', () => {
			assert.strictEqual(StatusMapper.mapToColor(9999), StatusMapperError.NOT_EXIST);
		});

		it('Should return the status color if a valid status name not found', () => {
			assert.strictEqual(StatusMapper.mapToColor('active'), 'green');
		});

		it('Should return the status color if a valid status ID not found', () => {
			assert.strictEqual(StatusMapper.mapToColor(1), 'green');
		});

	});

});
