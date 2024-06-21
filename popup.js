document.addEventListener('DOMContentLoaded', async () => {
    let contestList = document.getElementById('contest-list');

    try {
        let response = await fetch('https://codeforces.com/api/contest.list');
        let data = await response.json();

        if (data.status === 'OK') {
            let upcomingContests = data.result.filter(contest => contest.phase === 'BEFORE');
            if (upcomingContests.length === 0) {
                contestList.innerHTML = '<li>No upcoming contests</li>';
            } else {
                upcomingContests.forEach(contest => {
                    let listItem = document.createElement('li');
                    console.log(contest.startTimeSeconds + "                  " + new Date(contest.startTimeSeconds * 1000).toLocaleString());
                    listItem.textContent = `${contest.name} - ${new Date(contest.startTimeSeconds * 1000).toLocaleString()}`;
                    contestList.appendChild(listItem);
                });
            }
        } else {
            contestList.innerHTML = `<li>Error fetching contests: ${data.comment}</li>`;
        }
    } catch (error) {
        contestList.innerHTML = `<li>Error fetching contests: ${error.message}</li>`;
    }
});
