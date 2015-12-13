describe('CommonsService', () => {
    beforeEach(module('basketballStat.helpers'));

    var underTest;

    beforeEach(inject(Commons => {
        underTest = Commons;
    }));

    describe('swapArrayItemsByIndex function', () => {
        var elements,
            testCases = [
                {
                    fromIndex: 0,
                    toIndex: 0,
                    expected: ['element1', 'element2', 'element3', 'element4', 'element5']
                },
                {
                    fromIndex: 4,
                    toIndex: 0,
                    expected: ['element5', 'element2', 'element3', 'element4', 'element1']
                },
                {
                    fromIndex: 0,
                    toIndex: 4,
                    expected: ['element5', 'element2', 'element3', 'element4', 'element1']
                },
                {
                    fromIndex: 0,
                    toIndex: 1,
                    expected: ['element2', 'element1', 'element3', 'element4', 'element5']
                },
                {
                    fromIndex: 1,
                    toIndex: 0,
                    expected: ['element2', 'element1', 'element3', 'element4', 'element5']
                },
                {
                    fromIndex: 4,
                    toIndex: 3,
                    expected: ['element1', 'element2', 'element3', 'element5', 'element4']
                },
                {
                    fromIndex: 3,
                    toIndex: 4,
                    expected: ['element1', 'element2', 'element3', 'element5', 'element4']
                },
                {
                    fromIndex: 2,
                    toIndex: 3,
                    expected: ['element1', 'element2', 'element4', 'element3', 'element5']
                },
                {
                    fromIndex: 3,
                    toIndex: 2,
                    expected: ['element1', 'element2', 'element4', 'element3', 'element5']
                },
                {
                    fromIndex: 1,
                    toIndex: 3,
                    expected: ['element1', 'element4', 'element3', 'element2', 'element5']
                },
                {
                    fromIndex: 3,
                    toIndex: 1,
                    expected: ['element1', 'element4', 'element3', 'element2', 'element5']
                },
            ];

        beforeEach(() => {
            elements = ['element1', 'element2', 'element3', 'element4', 'element5'];
        });

        testCases.forEach(createAndRunReorderItemTestCase);

        function createAndRunReorderItemTestCase(testCase) {
            (function() {
                it(`should switch element: ${testCase.fromIndex} with ${testCase.toIndex}`, () => {
                    // GIVEN
                    // WHEN
                    var result;
                    underTest.swapArrayItemsByIndex(testCase.fromIndex, testCase.toIndex, elements)
                            .then(function(reorderedArray) {
                                result = reorderedArray;
                                // THEN
                                expect(result).toEqual(testCase.expected);
                            });
                });
            }());
        }

    });
});
