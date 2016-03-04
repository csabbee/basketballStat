angular.module('basketballStat.matches')
    .service('StatEventHandler', StatEventHandler);


function StatEventHandler($q) {
    const TWO_POINT_MADE = '2pt made',
        THREE_POINT_MADE = '3pt made',
        FREE_THROW_MADE = 'FT made',
        TWO_POINT_ATTEMPT = '2pt attempt',
        THREE_POINT_ATTEMPT = '3pt attempt',
        FREE_THROW_ATTEMPT = 'FT attempt';

    const SHOT_VALUES = {};
    SHOT_VALUES[TWO_POINT_MADE] = 2;
    SHOT_VALUES[THREE_POINT_MADE] = 3;
    SHOT_VALUES[FREE_THROW_MADE] = 1;

    const SHOT_ATTEMPT = [THREE_POINT_ATTEMPT, TWO_POINT_ATTEMPT, FREE_THROW_ATTEMPT];

    var playerStatTemplate = {
        twoPoint: {
            made: TWO_POINT_MADE,
            attempt: TWO_POINT_ATTEMPT
        },
        threePoint: {
            made: THREE_POINT_MADE,
            attempt: THREE_POINT_ATTEMPT
        },
        freeThrow: {
            made: FREE_THROW_MADE,
            attempt: FREE_THROW_ATTEMPT
        },
        rebound: {
            offensive: 'Offensive Rebound',
            defensive: 'Defensive Rebound'
        },
        assist: 'Assist',
        turnover: 'Turnover',
        steal: 'Steal',
        block: 'Block',
        personalFoul: 'Personal Foul'
    };
	
    return {
       handleEventCreation: handleEventCreation, 
       handleEventRemove: handleEventRemove
    };


    function handleEventCreation(...args) {
        var [stats, stat, key] = args;
        var event = {};
        event.name = !key ? playerStatTemplate[stat] : playerStatTemplate[stat][key];
        event.statKey = !key ? `${stat}` : `${stat}.${key}`;
        event.removeStat = createStatRemoveFunction(stats);


        function createStatRemoveFunction(stats) {
            return function() {
                var {name: statName, statKey} = event,
                    [stat, key] = statKey.split('.');

                if (!key) {
                    stats[stat] = stats[stat] - 1;
                } else if (!isShotAttempt()) {
                    stats[stat][key] = stats[stat][key] - 1;

                    if (isShotMade()) {
                        stats[stat]['attempt'] = stats[stat]['attempt'] - 1;
                    }

                } else if (isShotAttemptAndHavingMoreAttemptThanMade()){
                    stats[stat][key] = stats[stat][key] - 1;
                } else {
                    return false;
                }

                if (isShotMade()) {
                    stats.points = stats.points - SHOT_VALUES[statName];
                }

                function isShotMade() {
                    return SHOT_VALUES[statName];
                }

                function isShotAttempt() {
                    return SHOT_ATTEMPT.indexOf(statName) !== -1;
                }

                function isShotAttemptAndHavingMoreAttemptThanMade() {
                    return key === 'attempt' && stats[stat][key] > stats[stat]['made'];
                }

                return true;
            };
        }
  
        return event;
    }

    function handleEventRemove(event) {
		event.removeStat();
    }
}