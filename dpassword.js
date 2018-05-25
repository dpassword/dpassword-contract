'use strict';

var DPasswordContract = function () {
};

DPasswordContract.prototype = {
    init: function () {
    },

    save: function (data, dataHash) {
        var from = Blockchain.transaction.from;
        var passwords_obj = LocalContractStorage.get(from);
        if (!passwords_obj) {
            passwords_obj = {};
        }
        if (passwords_obj[dataHash]) {
            throw new Error("Password info already exist.");
        }
        passwords_obj[dataHash] = data;
        LocalContractStorage.set(from, passwords_obj);
    },

    update: function (data, dataHash) {
        var from = Blockchain.transaction.from;
        var passwords_obj = LocalContractStorage.get(from);
        if (!passwords_obj) {
            throw new Error("Password info not exist.");
        }
        if (!passwords_obj[dataHash]) {
            throw new Error("Password info not exist.");
        }
        passwords_obj[dataHash] = data;
        LocalContractStorage.set(from, passwords_obj);
    },

    delete: function (dataHash) {
        var from = Blockchain.transaction.from;
        var passwords_obj = LocalContractStorage.get(from);
        if (!passwords_obj) {
            throw new Error("Password info not exist.");
        }
        if (!passwords_obj[dataHash]) {
            throw new Error("Password info not exist.");
        }
        delete passwords_obj[dataHash];
        LocalContractStorage.set(from, passwords_obj);
    },

    get: function () {
        var from = Blockchain.transaction.from;
        return LocalContractStorage.get(from);
    }
};

module.exports = DPasswordContract;