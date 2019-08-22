'use strict';

const assert = require('assert');

const { StatusMapper, StatusMapperError } = require('./../lib');

describe('StatusMapper', () => {

	describe('map', () => {

		it('Should return error if a status name is not found', () => {
			assert.throws(() => StatusMapper.map('some-unknown-status-name'), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return error if a status ID is not found', () => {
			assert.throws(() => StatusMapper.map(9999), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return the status ID if a valid status name not found', () => {
			assert.strictEqual(StatusMapper.map('active'), 1);
		});

		it('Should return the status name if a valid status ID not found', () => {
			assert.strictEqual(StatusMapper.map(1), 'active');
		});

	});

	describe('mapToColor', () => {

		it('Should return error if a status name is not found', () => {
			assert.throws(() => StatusMapper.mapToColor('some-unknown-status-name'), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return error if a status ID is not found', () => {
			assert.throws(() => StatusMapper.mapToColor(9999), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return the status color if a valid status name not found', () => {
			assert.strictEqual(StatusMapper.mapToColor('active'), 'green');
		});

		it('Should return the status color if a valid status ID not found', () => {
			assert.strictEqual(StatusMapper.mapToColor(1), 'green');
		});

	});

	describe('add', () => {

		it('Should return error if exist status to add', () => {
			assert.throws(() => StatusMapper.add('active', 101), { code: StatusMapperError.codes.ALREADY_EXIST });
		});

		it('Should return undefined if not exist status to add', () => {
			assert.strictEqual(StatusMapper.add('test', 110), undefined);
		});
	});

	describe('addColor', () => {

		it('Should return error if exist status to add color', () => {
			assert.throws(() => StatusMapper.addColor('active', 'orange'), { code: StatusMapperError.codes.ALREADY_EXIST });
		});

		it('Should return undefined if not exist status to add color', () => {
			assert.strictEqual(StatusMapper.addColor('test', 'orange'), undefined);
		});
	});

	describe('replace', () => {

		it('Should return error if not exist status to replace', () => {
			assert.throws(() => StatusMapper.replace({ 'unknown-status': 120 }), { code: StatusMapperError.codes.NOT_EXIST_TO_REPLACE });
			assert.throws(() => StatusMapper.replace({ 'unknown-status': 120, active: 101 }), { code: StatusMapperError.codes.NOT_EXIST_TO_REPLACE });
		});

		it('Should return undefined if the statuses were replaced and check really replaced', () => {
			assert.strictEqual(StatusMapper.replace({ active: 101 }), undefined);
			assert.strictEqual(StatusMapper.map(101), 'active');

			assert.strictEqual(StatusMapper.replace({ active: 20, ready: 30 }), undefined);
			assert.strictEqual(StatusMapper.map(20), 'active');
			assert.strictEqual(StatusMapper.map('ready'), 30);
		});
	});

	describe('replaceColor', () => {

		it('Should return error if not exist status to replace color', () => {
			assert.throws(() => StatusMapper.replaceColor({ 'unknown-status': 'orange' }), { code: StatusMapperError.codes.NOT_EXIST_TO_REPLACE });
			assert.throws(() => {
				StatusMapper.replaceColor({ 'unknown-status': 'orange', active: 'black' });
			}, { code: StatusMapperError.codes.NOT_EXIST_TO_REPLACE });
		});

		it('Should return undefined if the statuses were replaced and check really color replaced', () => {
			assert.strictEqual(StatusMapper.replaceColor({ active: 'black' }), undefined);
			assert.strictEqual(StatusMapper.mapToColor('active'), 'black');
		});
	});
});
