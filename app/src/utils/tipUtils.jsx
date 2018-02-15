export function getCurrentDate() {
    // new Date('2016-06-21 15:00:00').getTime();
    return Date.now();
}

export function createTipListForPost(formReducer, data) {
    const tipList = [];
    let currentMatchId = 0;
    let tipObj = {};

    Object.keys(data).forEach((prop) => {
        const formFieldObj = formReducer[prop];
        const value = data[prop];
        const arr = prop.split('-');
        const matchId = parseInt(arr[0], 10);
        const tipTeam = arr[1];
        if (matchId !== currentMatchId) {
            tipObj = {};
            if (typeof value !== 'undefined') {
                tipObj.matchId = matchId;
                if (value === '') {
                    // Check if tip needs to be deleted
                    if (formFieldObj.visited) {
                        tipObj[tipTeam] = -1;
                    }
                } else {
                    tipObj[tipTeam] = parseInt(value, 10);
                }
            }
            currentMatchId = matchId;
        } else if (tipObj.matchId) {
            if (typeof value !== 'undefined') {
                if (value === '') {
                    // Check if tip needs to be deleted
                    if (formFieldObj.visited) {
                        tipObj[tipTeam] = -1;
                    }
                } else {
                    tipObj[tipTeam] = parseInt(value, 10);
                }
            }
        }
        if (tipObj.matchId && Object.prototype.hasOwnProperty.call(tipObj, 'tipTeamA') && Object.prototype.hasOwnProperty.call(tipObj, 'tipTeamB')) {
            tipList.push(tipObj);
        }
    });
    return tipList;
}
