import calculatePercentages from './percentage';

describe('calculatePercentages', function() {
    describe('when valid input', function() {
        it('should return proper values', function () {
            expect(calculatePercentages([1.5, 3, 6, 1.5])).toEqual(['12.500', '25.000', '50.000', '12.500']);
            expect(calculatePercentages([1, 2, 3, 4])).toEqual(['10.000', '20.000', '30.000', '40.000']);
            expect(calculatePercentages(['1', '2', '3', '4'])).toEqual(['10.000', '20.000', '30.000', '40.000']);
        });
    });
    describe('when invalid input', function() {
        it('should return undefined', function () {
            expect(calculatePercentages(5, 5)).toBeUndefined();
            expect(calculatePercentages('somestring')).toBeUndefined();
            expect(calculatePercentages(false)).toBeUndefined();
            expect(calculatePercentages()).toBeUndefined();
        });
        it('should return array with NaN', function () {
            expect(calculatePercentages([1, 2, 3, 'a'])).toEqual(['NaN', 'NaN', 'NaN', 'NaN']);
            expect(calculatePercentages([1, 'a'])).toEqual(['NaN', 'NaN']);
        });
    });
});
