

async function fetchContests() {
    try {
        let response = await fetch('https://codeforces.com/api/contest.list');
        let data = await response.json();
        if (data.status === 'OK') {
            let upcomingContests = data.result.filter(contest => contest.phase === 'BEFORE');
            return upcomingContests;
        } else {
            console.error('Failed to fetch contests:', data.comment);
            return [];
        }
    } catch (error) {
        console.error('Error fetching contests:', error);
        return [];
    }
}

chrome.alarms.create('fetchContests', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'fetchContests') {
        let contests = await fetchContests();
        if (contests.length > 0) {
            // console.log(contests[0]);
            let nextContest = contests[0];
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'Next Codeforces Contest',
                message: `${nextContest.name} starts at ${new Date(nextContest.startTimeSeconds * 1000).toLocaleString()}`,
                priority: 2
            });
        }
    }
});
