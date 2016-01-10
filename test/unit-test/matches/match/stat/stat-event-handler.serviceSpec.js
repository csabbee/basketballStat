describe('StatEventHandler', () => {
    const TURNOVER = 'turnover',
        ASSIST = 'assist',
        STEAL = 'steal',
        BLOCK = 'block',
        PERSONAL_FOUL = 'personalFoul',
        REBOUND = 'rebound',
        TWO_POINT = 'twoPoint',
        THREE_POINT = 'threePoint',
        FREE_THROW = 'freeThrow';
    const SHOTS = [FREE_THROW, TWO_POINT, THREE_POINT];

	beforeEach(() => {
		angular.mock.module('ui.router');
		angular.mock.module('basketballStat.storage');
		angular.mock.module('ngCordova');
		angular.mock.module('basketballStat.helpers');
	});
	beforeEach(module('basketballStat.matches'));

	var underTest,
        playerStat = {
        time: 0, points: 6, twoPoint: { made: 1, attempt: 1 }, threePoint: { made: 1, attempt: 1 },
        freeThrow: { made: 1, attempt: 1 }, rebound: { offensive: 1, defensive: 1 },
        assist: 1, turnover: 1, steal: 1, block: 1, personalFoul: 1, events: []
    };

	beforeEach(inject(StatEventHandler => {
		underTest = StatEventHandler;
	}));

    var testCases = [
        { input: [playerStat, TURNOVER], expect: { name: 'Turnover' } },
        { input: [playerStat, ASSIST], expect: { name: 'Assist' } },
        { input: [playerStat, STEAL], expect: { name: 'Steal' } },
        { input: [playerStat, BLOCK], expect: { name: 'Block' } },
        { input: [playerStat, PERSONAL_FOUL], expect: { name: 'Personal Foul' } },
        { input: [playerStat, TWO_POINT, 'made'], expect: { name: '2pt made' } },
        { input: [playerStat, TWO_POINT, 'attempt'], expect: { name: '2pt attempt' } },
        { input: [playerStat, THREE_POINT, 'made'], expect: { name: '3pt made' } },
        { input: [playerStat, THREE_POINT, 'attempt'], expect: { name: '3pt attempt' } },
        { input: [playerStat, FREE_THROW, 'made'], expect: { name: 'FT made' } },
        { input: [playerStat, FREE_THROW, 'attempt'], expect: { name: 'FT attempt' } },
        { input: [playerStat, REBOUND, 'offensive'], expect: { name: 'Offensive Rebound' } },
        { input: [playerStat, REBOUND, 'defensive'], expect: { name: 'Defensive Rebound' } }
    ];

	describe(`handleEventCreation`, () => {
		testCases
			.forEach(createAndRunTestCases);

		function createAndRunTestCases(testCase) {
			(function() {
                var [, input1, input2] = testCase.input,
                    // Renaming destructured object key
                    {name: expectedName} = testCase.expect;
				it(`should return for stat: ${input1}${input2 ? '.' + input2 : ''} an event with property name: ${expectedName}`, () => {
					// GIVEN
					// WHEN
					var {name: resultName} = underTest.handleEventCreation.apply(null, testCase.input);

					// THEN
					expect(resultName).toEqual(expectedName);
				});
			}());
		}
	});

    describe(`handleEventRemove`, () => {
        testCases
            .map(clonePlayerStat)
            .map(createExpectedPlayerStat)
            .forEach(createAndRunTestCases);

        function createAndRunTestCases(testCase) {
            (function() {
                var [stats, input1, input2] = testCase.input,
                    expectedResult = input2 ? testCase.expect.playerStat[input1][input2] : testCase.expect.playerStat[input1],
                    expectedPoints = testCase.expect.playerStat.points;

                it(`should set stat: ${input1}${input2 ? '.' + input2 : ''} to ${expectedResult}`, () => {
                    // GIVEN
                    var testEvent = underTest.handleEventCreation.apply(null, testCase.input);
                    var [stat, key] = testEvent.statKey.split('.');

                    // WHEN
                    underTest.handleEventRemove(testEvent);

                    // THEN
                    var testedStat = !key ? stats[stat] : stats[stat][key],
                        testedPoints = stats.points;
                    expect(testedStat).toEqual(expectedResult);
                    if (input2 === 'made') {
                        expect(stats[stat]['attempt']).toEqual(testCase.expect.playerStat[input1]['attempt']);
                    }
                    expect(testedPoints).toEqual(expectedPoints);
                });
            }());
        }

        function clonePlayerStat(testCase) {
            testCase.expect.playerStat = JSON.parse(JSON.stringify(playerStat));
            testCase.input[0] = JSON.parse(JSON.stringify(playerStat));
            return testCase;
        }

        function createExpectedPlayerStat(testCase) {
            _.chain([testCase])
                .map(handleSingleStat)
                .map(handleCompoundStat);

            function isCompoundStat(testCase) {
                return !_.isUndefined(testCase.input[2]);
            }

            function handleSingleStat(testCase) {
                if (!isCompoundStat(testCase)) {
                    testCase.expect.playerStat[testCase.input[1]] = 0;
                }
                return testCase;
            }

            function handleCompoundStat(testCase) {
                if (isCompoundStat(testCase)) {
                    _.chain([testCase])
                        .map(handleRebounds)
                        .map(handleShots)
                }
                return testCase;

                function handleRebounds(testCase) {
                    if (testCase.input[1] === REBOUND) {
                        testCase.expect.playerStat[testCase.input[1]][testCase.input[2]] = 0;
                    }
                    return testCase;
                }

                // TODO: only testing the made shots at the moment. Figure out how should it work for attempts
                function handleShots(testCase) {
                    var [, stat, key] = testCase.input;
                    if (_.contains(SHOTS, stat)) {
                        if (key === 'made') {
                            testCase.expect.playerStat[stat][key] = 0;
                            testCase.expect.playerStat[stat]['attempt'] = 0;
                            var pointsToRemove = SHOTS.indexOf(stat) + 1;
                            testCase.expect.playerStat.points = testCase.expect.playerStat.points - pointsToRemove;
                        }
                    }
                    return testCase;
                }
            }

            return testCase;
        }
    });
});