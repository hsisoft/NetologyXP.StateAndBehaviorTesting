"use strict";

class SmsServiceFake {
    constructor() {
        this._lastSentSms = '';
    }

    send(message) {
        this._lastSentSms = message;
    }

    get lastSentSms() {
        return this._lastSentSms;
    }

    get wasCalled(){
        return this._lastSentSms === '' ? false : true;
    }
}

module.exports = SmsServiceFake;