describe('KeyGeneratorService', () => {
    var underTest,
        testStoreObject = {
            store: 'testStore',
            usedIds: [0,1,3,4,8]
        };

    beforeEach(module('basketballStat.storage'));

    beforeEach(inject(KeyGenerator => {
        underTest = KeyGenerator;
    }));

    describe('nextKey function', () => {
        var expect1 = 2,
            expect2 = 5,
            expect3 = 9;
        it(`should return ${expect1}`, () => {
            // GIVEN
            underTest.setSeed(testStoreObject);
            // WHEN
            var result = underTest.nextKey(testStoreObject.store);
            // THEN
            expect(result).toBe(expect1);
        });

        it(`should return ${expect2}`, () => {
            // GIVEN
            underTest.setSeed(testStoreObject);
            // WHEN
            var result = underTest.nextKey(testStoreObject.store);
            // THEN
            expect(result).toBe(expect2);
        });

        it(`should return ${expect3}`, () => {
            // GIVEN
            underTest.setSeed(testStoreObject);
            // WHEN
            underTest.nextKey(testStoreObject.store);
            underTest.nextKey(testStoreObject.store);
            var result = underTest.nextKey(testStoreObject.store);
            // THEN
            expect(result).toBe(expect3);
        });
    });
});