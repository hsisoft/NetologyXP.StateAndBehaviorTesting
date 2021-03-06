"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var sinon = require('sinon');

var SmsService = require('../src/sms-service');
var Visitor = require('../src/visitor');
var CupboardFake = require('../tests/fakes/cupboard-fake');
var SmsServiceFake = require('../tests/fakes/sms-service-fake');

var ERP = require('../src/ERP');

suite('When barmen pours drinks', function () {
    suite('cupboard is empty', function () {
        let visitor = {};
        let barmen = {};
        let emptyCupboard = {};

        let erp = new ERP();

        setup(function () {
            visitor = new Visitor();
            visitor.sober();

            emptyCupboard = new CupboardFake();
            emptyCupboard.empty = true;
        });
/*
        test('sms to buy drink is sent to boss', function () {
            let smsService = new SmsServiceFake();
            barmen = new Barmen(emptyCupboard, smsService);

            barmen.pour("vodka", 100, visitor, erp);

            assert.equal(smsService.lastSentSms, "Hello. We have run out of vodka. Please buy several bottles.");
        });

        test('sms service is called if no drink is available', function () {
            let smsService = new SmsService();
            let smsServiceMock = sinon.mock(smsService);
            barmen = new Barmen(emptyCupboard, smsService);
            smsServiceMock.expects("send")
                .once()
                .withArgs("Hello. We have run out of vodka. Please buy several bottles.");

            barmen.pour("vodka", 100, visitor, erp);

            smsServiceMock.verify();
            smsServiceMock.restore();
        });
*/
        test('barmen sends only one sms to buy a drink to boss', function () {
			let smsService = new SmsServiceFake();
			let smsServiceMock = sinon.mock(smsService);

			barmen = new Barmen(emptyCupboard, smsService);

			smsServiceMock.expects("send")
				.once()
				.withArgs("Hello. We have run out of vodka. Please buy several bottles.");

			barmen.pour("vodka", 100, visitor, erp);
			barmen.pour("vodka", 100, visitor, erp);

			smsServiceMock.verify();
			smsServiceMock.restore();
        });
    });

	suite('cupboard is full', function () {
		let visitor = {};
		let barmen = {};
		let alwaysFullCupboard = {};
		let smsService = {};
		let erp = new ERP();

		setup(function () {
			visitor = new Visitor();
			visitor.sober();

			alwaysFullCupboard = new CupboardFake();
			alwaysFullCupboard.empty = false;

			let smsService = new SmsServiceFake();
		});

		test('a payment detail is stored in ERP', function () {
			barmen = new Barmen(alwaysFullCupboard, smsService);
			let erpMock = sinon.mock(erp);

			erpMock.expects("registerSale")
				.twice();
//				.withArgs("Hello. We have run out of vodka. Please buy several bottles.");

			barmen.pour("vodka", 100, visitor, erp);
			barmen.pour("vodka", 100, visitor, erp);

			erpMock.verify();
			erpMock.restore();
		});
	});

});