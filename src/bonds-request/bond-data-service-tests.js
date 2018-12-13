import BondDataService from './bond-data-service';

describe('BondDataService', function() {
    describe('getBonds', function() {
        describe('when incorrect input arguments', function() {
            it('should resolve undefined', async function () {
                expect(await BondDataService.getBonds('', [2, 3])).toBeUndefined();
                expect(await BondDataService.getBonds('20181207')).toBeUndefined();
                expect(await BondDataService.getBonds('20181207', [])).toBeUndefined();
            });
        });
        describe('when correct input arguments', function() {
            describe('when fetch works', function() {
                const data = [
                    {
                        isin: 'XS0971721963',
                        data: {status: 'ok'}
                    },
                    {
                        isin: 'RU000A0JU4L3',
                        data: {status: 'ok'}
                    }
                ];
                beforeAll(function() {
                    global.http = {};
                    global.http.post = jest.fn().mockResolvedValue(data);
                });
                it('should call fetch in first time', async function () {
                    await BondDataService.getBonds('20181207', ['XS0971721963', 'RU000A0JU4L3']);
                    expect(http.post.mock.calls.length).toBe(1);
                });
                it('should call fetch again with different arguments', async function () {
                    await BondDataService.getBonds('20181207', ['XS0971721963', 'RU000A0JU4L5']);
                    expect(http.post.mock.calls.length).toBe(2);
                });
                it('should not call fetch again with same arguments', async function () {
                    await BondDataService.getBonds('20181207', ['XS0971721963', 'RU000A0JU4L3']);
                    expect(http.post.mock.calls.length).toBe(2);
                });
                it('should resolve fetched data', async function () {
                    const result = await BondDataService.getBonds('20181207', ['XS0971721963', 'RU000A0JU4L3']);
                    expect(result).toEqual(data);
                });
            });
            describe('when fetch error', function() {
                it('should resolve undefined', async function () {
                    global.http.post.mockRejectedValue();
                    const result = await BondDataService.getBonds('20181206', ['XS0971721963', 'RU000A0JU4L5']);
                    expect(result).toBeUndefined();
                });
            });
        });
    });

    describe('getHash', function() {
        it('should return proper value', function () {
            const result = BondDataService.getHash('', ['A']);
            expect(result).toBe(65);
        });
        it('should return same values for calls with same arguments', function () {
            const options = ['20181207', ['XS0971721963', 'RU000A0JU4L5']];
            const result1 = BondDataService.getHash(...options);
            const result2 = BondDataService.getHash(...options);
            expect(result1).toBe(result2);
        });
        it('should return same values for calls with same isin codes but in different positions', function () {
            const result1 = BondDataService.getHash('20181207', ['XS0971721963', 'RU000A0JU4L5']);
            const result2 = BondDataService.getHash('20181207', ['RU000A0JU4L5', 'XS0971721963']);
            expect(result1).toBe(result2);
        });
        it('should return same values for calls with different arguments', function () {
            const result1 = BondDataService.getHash('20181207', ['XS0971721963', 'RU000A0JU4L5']);
            const result2 = BondDataService.getHash('20181208', ['XS0971721963', 'RU000A0JU4L5']);
            expect(result1).not.toBe(result2);
        });
    });
});
