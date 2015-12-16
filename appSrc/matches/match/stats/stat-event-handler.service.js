angular.module('basketballStat.matches')
    .service('StatEventHandler', StatEventHandler);


function StatEventHandler() {
    var playerStatTemplate = {
        twoPoint: {
            made: '2pt made',
            attempt: '2pt attempt'
        },
        threePoint: {
            made: '3pt made',
            attempt: '3pt attempt'
        },
        freeThrow: {
            made: 'FT made',
            attempt: 'FT attempt'
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
  
        return event;
    }

    function handleEventRemove(event) {
		
    }
}