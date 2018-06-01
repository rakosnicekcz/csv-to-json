"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToJson = function (csvText, delimiter) {
    if (delimiter === void 0) { delimiter = exports.findDelimiter(csvText); }
    var rows = exports.rowsSpliter(csvText);
    return exports.rowsRider(rows, delimiter);
};
exports.rowsSpliter = function (csvText) {
    return csvText.split(/[\r\n]+/).filter(function (v) {
        return v;
    });
};
exports.findDelimiter = function (csvText) {
    var index = csvText.search(/[,;| ]/);
    return csvText[index];
};
exports.rowsRider = function (rows, delimiter) {
    var fields = rows[0].split(delimiter);
    var objArray = [];
    for (var i = 1, len = rows.length; i < len; i++) {
        var row = rows[i] += delimiter;
        objArray.push(exports.charRider(row, fields, delimiter));
    }
    return objArray;
};
exports.charRider = function (row, fields, delimiter) {
    var castedValue = '';
    var stringDetection = 0;
    var obj = {};
    var indexCalculator = 0;
    for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
        var char = row_1[_i];
        if (char === '"') {
            if (stringDetection === 2) {
                stringDetection--;
                castedValue += char;
                continue;
            }
            stringDetection++;
            continue;
        }
        if (char === delimiter && (stringDetection === 0 || stringDetection === 2)) {
            obj[fields[indexCalculator]] = exports.getCastedValue(castedValue);
            castedValue = '';
            indexCalculator++;
            stringDetection = 0;
        }
        else {
            castedValue += char;
        }
    }
    return obj;
};
exports.getCastedValue = function (value) {
    return value === '' ? null : isNaN(value) ? value : +value;
};
