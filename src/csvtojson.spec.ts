import { csvToJson, rowsSpliter, getCastedValue, charRider,
     rowsRider, findDelimiter } from './csvtojson';

// tslint:disable-next-line:max-func-body-length
describe.only('utils/csvtojson', () => {

    describe('#csvToJson = (csvText)', () => {

        it('should return right array with one object', () => {
            expect(csvToJson('atr1,atr2\nvalue1,value2', ',')).toEqual([{ atr1: 'value1', atr2: 'value2' }]);
        });
    });

    describe('rowsSpliter', () => {

        it('should spilt \r\n input', () => {
            expect(rowsSpliter('a\r\nb\r\n')).toEqual(['a', 'b']);
        });

        it('should spilt \n input', () => {
            expect(rowsSpliter('a\nb\n\n')).toEqual(['a', 'b']);
        });

        it('should spilt \n input without trailing \n', () => {
            expect(rowsSpliter('a\nb')).toEqual(['a', 'b']);
        });

        it('should spilt \r input without trailing \n', () => {
            expect(rowsSpliter('a\rb\r')).toEqual(['a', 'b']);
        });
    });

    describe('getCastedValue', () => {

        it('should return string', () => {
            expect(getCastedValue('babicka')).toEqual('babicka');
            expect(getCastedValue('1234')).toEqual(1234);
            expect(getCastedValue('12.34')).toEqual(12.34);
            expect(getCastedValue('Bob86')).toEqual('Bob86');
            expect(getCastedValue('92bob')).toEqual('92bob');
            expect(getCastedValue('12:34')).toEqual('12:34');
            expect(getCastedValue('12.12.12')).toEqual('12.12.12');
           /* const should = chai.should();
            should.not.exist(getCastedValue(''));*/
        });
    });
    describe('charRider', () => {

        it('should return right object', () => {
            expect(charRider('cat,eagel,', ['atr1', 'atr2'], ',')
                ).toEqual({ atr1: 'cat', atr2: 'eagel' });
                expect(charRider('Bob,', ['atr1', 'atr2'], ',')
                ).toEqual({ atr1: 'Bob' });
                expect(charRider('cat,eagel,', ['atr1', 'atr2'], ',')
                ).toEqual({ atr1: 'cat', atr2: 'eagel' });
                expect(charRider('cat;eagel,', ['atr1', 'atr2'], ',')
                ).toEqual({ atr1: 'cat;eagel' });
                expect(charRider('cat;eagel,;', ['atr1', 'atr2'], ';')
                ).toEqual({ atr1: 'cat', atr2: 'eagel,' });
                expect(charRider('cat;eagel;', ['atr1', 'atr2'], ';')
                ).toEqual({ atr1: 'cat', atr2: 'eagel' });
                expect(charRider('cat;;eagel;', ['atr1', 'atr2', 'atr3'], ';')
                ).toEqual({ atr1: 'cat', atr2: null, atr3: 'eagel' });
                expect(charRider('cat;86.19;eagel;', ['atr1', 'atr2', 'atr3'], ';')
                ).toEqual({ atr1: 'cat', atr2: 86.19, atr3: 'eagel' });
                expect(charRider('cat;"learn; it";eagel;', ['atr1', 'atr2', 'atr3'], ';')
                ).toEqual({ atr1: 'cat', atr2: 'learn; it', atr3: 'eagel' });
                expect(charRider('cat;"86";eagel;', ['atr1', 'atr2', 'atr3'], ';')
                ).toEqual({ atr1: 'cat', atr2: 86, atr3: 'eagel' });
                expect(charRider('pat;""";mat";shake;', ['atr1', 'atr2', 'atr3'], ';')
                ).toEqual({ atr1: 'pat', atr2: '";mat', atr3: 'shake' });
        });
    });

    describe('rowsRider', () => {

        it('should return array of objects', () => {
            expect(rowsRider(['atr1;atr2', 'dog;lock', 'cat;86', 'Bob;shock'], ';'))
                .toEqual([{ atr1: 'dog', atr2: 'lock' }, { atr1: 'cat', atr2: 86 }, { atr1: 'Bob', atr2: 'shock' }]);
        });

    });
    describe('findDelimiter', () => {

        it('should return right delimiter', () => {
            expect(findDelimiter('dog,eagel,fish')).toEqual(',');
            expect(findDelimiter('dog;eagel;fish')).toEqual(';');
            expect(findDelimiter('dog|eagel|fish')).toEqual('|');
            expect(findDelimiter('dog eagel fish')).toEqual(' ');
        });
});
});
