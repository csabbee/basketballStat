describe('CommonsService', () => {
    beforeEach(module('basketballStat.helpers'));

    var underTest,
        rootScope;

    beforeEach(inject((Commons, $rootScope) => {
        underTest = Commons;
        rootScope = $rootScope;
    }));

    describe('shiftArrayItemsByIndex function', () => {
        var elements,
            testCases = [
                {
                    fromIndex: 0,
                    toIndex: 0,
                    expected: ['element0', 'element1', 'element2', 'element3', 'element4']
                },
                {
                    fromIndex: 4,
                    toIndex: 0,
                    expected: ['element4', 'element0', 'element1', 'element2', 'element3']
                },
                {
                    fromIndex: 0,
                    toIndex: 4,
                    expected: ['element1', 'element2', 'element3', 'element4', 'element0']
                },
                {
                    fromIndex: 0,
                    toIndex: 1,
                    expected: ['element1', 'element0', 'element2', 'element3', 'element4']
                },
                {
                    fromIndex: 1,
                    toIndex: 0,
                    expected: ['element1', 'element0', 'element2', 'element3', 'element4']
                },
                {
                    fromIndex: 4,
                    toIndex: 3,
                    expected: ['element0', 'element1', 'element2', 'element4', 'element3']
                },
                {
                    fromIndex: 3,
                    toIndex: 4,
                    expected: ['element0', 'element1', 'element2', 'element4', 'element3']
                },
                {
                    fromIndex: 2,
                    toIndex: 3,
                    expected: ['element0', 'element1', 'element3', 'element2', 'element4']
                },
                {
                    fromIndex: 3,
                    toIndex: 2,
                    expected: ['element0', 'element1', 'element3', 'element2', 'element4']
                },
                {
                    fromIndex: 1,
                    toIndex: 3,
                    expected: ['element0', 'element2', 'element3', 'element1', 'element4']
                },
                {
                    fromIndex: 3,
                    toIndex: 1,
                    expected: ['element0', 'element3', 'element1', 'element2', 'element4']
                },
            ];

        beforeEach(() => {
            elements = ['element0', 'element1', 'element2', 'element3', 'element4'];
        });

        testCases.forEach(createAndRunReorderItemTestCase);

        function createAndRunReorderItemTestCase(testCase) {
            (function() {
                it(`should switch element: ${testCase.fromIndex} with ${testCase.toIndex}`, () => {
                    // GIVEN
                    // WHEN
                    var result;
                    underTest.shiftArrayItemsByIndex(testCase.fromIndex, testCase.toIndex, elements)
                            .then(function(reorderedArray) {
                                result = reorderedArray;
                                // THEN
                            });
                   rootScope.$apply();
                   expect(result).toEqual(testCase.expected);
                });
            }());
        }

    });
});
