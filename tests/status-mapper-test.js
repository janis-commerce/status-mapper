'use strict';

const assert = require('assert');

const StatusMapper = require('./../lib/status-mapper');
const StatusMapperError = require('./../lib/status-mapper-error');

describe('StatusMapper', () => {

	describe('map', () => {

		const mapper = new StatusMapper();

		it('Should return error if a status name is not found', () => {
			assert.throws(() => mapper.map('some-unknown-status-name'), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return error if a status ID is not found', () => {
			assert.throws(() => mapper.map(9999), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return the status ID if a valid status name not found', () => {
			assert.strictEqual(mapper.map('active'), 1);
		});

		it('Should return the status name if a valid status ID not found', () => {
			assert.strictEqual(mapper.map(1), 'active');
		});

	});

	describe('mapToColor', () => {

		const mapper = new StatusMapper();

		it('Should return error if a status name is not found', () => {
			assert.throws(() => mapper.mapToColor('some-unknown-status-name'), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return error if a status ID is not found', () => {
			assert.throws(() => mapper.mapToColor(9999), { code: StatusMapperError.codes.NOT_EXIST });
		});

		it('Should return the status color if a valid status name not found', () => {
			assert.strictEqual(mapper.mapToColor('active'), 'green');
		});

		it('Should return the status color if a valid status ID not found', () => {
			assert.strictEqual(mapper.mapToColor(1), 'green');
		});

	});

	describe('set', () => {

		const mapper = new StatusMapper();

		it('Should return error if set a invalid status name', () => {
			assert.throws(() => mapper.set(1, 'statusName'), { code: StatusMapperError.codes.INVALID_DATA });
		});

		it('Should set and get the new status', () => {
			assert.strictEqual(mapper.set('newStatus', 10), undefined);
			assert.strictEqual(mapper.map('newStatus'), 10);
		});

	});

	describe('setColor', () => {

		const mapper = new StatusMapper();

		it('Should return error if set a invalid color name', () => {
			assert.throws(() => mapper.setColor('statusName', 1), { code: StatusMapperError.codes.INVALID_DATA });
		});

		it('Should set and get the new color status', () => {
			assert.strictEqual(mapper.setColor('statusName', 'black'), undefined);
			assert.strictEqual(mapper.mapToColor('statusName'), 'black');
		});
	});

	describe('replace', () => {

		const mapper = new StatusMapper();

		it('Replace status', () => {
			assert.strictEqual(mapper.map('active'), 1);
			assert.strictEqual(mapper.replace({ otherStatus: 5 }), undefined);
			assert.throws(() => mapper.map('active'), { code: StatusMapperError.codes.NOT_EXIST });
			assert.strictEqual(mapper.map('otherStatus'), 5);
		});
	});

	describe('replaceColor', () => {

		const mapper = new StatusMapper();

		it('Replace status', () => {
			assert.strictEqual(mapper.mapToColor('active'), 'green');
			assert.strictEqual(mapper.replaceColor({ otherStatus: 'black' }), undefined);
			assert.throws(() => mapper.mapToColor('active'), { code: StatusMapperError.codes.NOT_EXIST });
			assert.strictEqual(mapper.mapToColor('otherStatus'), 'black');
		});
	});
});
