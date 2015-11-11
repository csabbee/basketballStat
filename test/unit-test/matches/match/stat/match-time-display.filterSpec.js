describe('matchTimeDisplayFilter', ()=> {
    beforeEach(module('basketballStat.helpers'));

    var underTest,
        expect1 = {input: 100, output: '00:00:1'},
        expect2 = {input: 1000, output:'00:01:0'},
        expect3 = {input: 1500, output:'00:01:5'},
        expect4 = {input: 51000, output:'00:51:0'},
        expect5 = {input: 60000, output:'01:00:0'},
        expect6 = {input: 71100, output:'01:11:1'},
        expect7 = {input: 10*60*1000, output:'10:00:0'},
        expectations = [expect1, expect2, expect3, expect4, expect5, expect6, expect7];

    beforeEach(inject(function($filter) {
        underTest = $filter('matchTimeDisplay');
    }));

    expectations.forEach(expectation => {
        it(`should return ${expectation.output}`, ()=> {
            // GIVEN
            // WHEN
            var result = underTest(expectation.input);
            // THEN
            expect(result).toBe(expectation.output);
        });
    });
});
