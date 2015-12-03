angular.module('basketballStat.helpers')
    .constant('eventListing', {
        playerListUpdate: 'players.list.update',
        matchListUpdate: 'matches.list.update',
        teamListUpdate: 'teams.list.update',
        timeTickEmit: 'time.is.ticking',
        timerStopEmit: 'time.is.stopped',
        timerReachedZero: 'time.is.up'
    });
