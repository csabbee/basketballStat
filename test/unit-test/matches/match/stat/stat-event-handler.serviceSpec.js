describe('StatEventHandler', () => {
	beforeEach(() => {
		angular.mock.module('ui.router');
		angular.mock.module('basketballStat.storage');
		angular.mock.module('ngCordova');
		angular.mock.module('basketballStat.helpers');
	});
	beforeEach(module('basketballStat.matches'));

	var underTest;

	beforeEach(inject(StatEventHandler => {
		underTest = StatEventHandler;
	}));

	describe(`handleEventCreation`, () => {
		var playerStat = { 
					time: 0, points: 6, twoPoint: { made: 1, attempt: 1 }, threePoint: { made: 1, attempt: 1 },
					freeThrow: { made: 1, attempt: 1 }, rebound: { offensive: 1, defensive: 1 },
					assist: 1, turnover: 1, steal: 1, block: 1, personalFoul: 1, events: []
				};
		beforeEach(() => {	
			playerStat = 
				{ 
					time: 0, points: 0, twoPoint: { made: 0, attempt: 0 }, threePoint: { made: 0, attempt: 0 },
					freeThrow: { made: 0, attempt: 0 }, rebound: { offensive: 0, defensive: 0 },
					assist: 0, turnover: 0, steal: 0, block: 0, personalFoul: 0, events: []
				};
		});

		var testCases = [
			{ input: [playerStat, 'turnover'], expect: { name: 'Turnover' } },
			{ input: [playerStat, 'assist'], expect: { name: 'Assist' } },
			{ input: [playerStat, 'steal'], expect: { name: 'Steal' } },
			{ input: [playerStat, 'block'], expect: { name: 'Block' } },
			{ input: [playerStat, 'personalFoul'], expect: { name: 'Personal Foul' } },
			{ input: [playerStat, 'twoPoint', 'made'], expect: { name: '2pt made' } },
			{ input: [playerStat, 'twoPoint', 'attempt'], expect: { name: '2pt attempt' } },
			{ input: [playerStat, 'threePoint', 'made'], expect: { name: '3pt made' } },
			{ input: [playerStat, 'threePoint', 'attempt'], expect: { name: '3pt attempt' } },
			{ input: [playerStat, 'freeThrow', 'made'], expect: { name: 'FT made' } },
			{ input: [playerStat, 'freeThrow', 'attempt'], expect: { name: 'FT attempt' } },
			{ input: [playerStat, 'freeThrow', 'attempt'], expect: { name: 'FT attempt' } },
			{ input: [playerStat, 'rebound', 'offensive'], expect: { name: 'Offensive Rebound' } },
			{ input: [playerStat, 'rebound', 'defensive'], expect: { name: 'Defensive Rebound' } }
		];

		testCases.forEach(createAndRunReorderItemTestCase);

        function createAndRunReorderItemTestCase(testCase) {
            (function() {
                it(`should return for stat: ${testCase.input[1]}${testCase.input[2] ? '.'+testCase.input[2] : ''} an event with property name: ${testCase.expect.name}`, () => {
					// GIVEN
					// WHEN
					var result = underTest.handleEventCreation.apply(null, testCase.input);
					
					// THEN
					expect(result.name).toEqual(testCase.expect.name);
				});
            }());
        }
	});
	
});