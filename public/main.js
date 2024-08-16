document.addEventListener("DOMContentLoaded", function() {
    const scrapeInterval = 30; // 30 seconds
    let countdown = scrapeInterval;
    let lastGoodData = null;
    let firstScrape = true;

    const updateProgressBar = (raised, goal) => {
        document.getElementById('raised').textContent = `$${raised.toLocaleString()} Raised`;
        document.getElementById('goal').textContent = `Goal $${goal.toLocaleString()}`;

        const progressPercentage = (raised / goal) * 100;
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage.toFixed(2));

        console.log({
            raised: raised,
            goal: goal,
            progressPercentage: progressPercentage.toFixed(2),
            progressBarWidth: `${progressPercentage}%`
        });
    };

    const showError = () => {
        document.getElementById('thermometer').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    };

    const hideError = () => {
        document.getElementById('thermometer').style.display = 'block';
        document.getElementById('error').style.display = 'none';
    };

    const fetchData = () => {
        fetch('/scrape')
            .then(response => response.json())
            .then(data => {
                lastGoodData = data;
                updateProgressBar(data.raised, data.goal);

                if (firstScrape) {
                    hideError();
                    firstScrape = false;
                }

                countdown = scrapeInterval;
            })
            .catch(error => {
                console.error('Error fetching data:', error);

                if (firstScrape) {
                    showError();
                } else if (lastGoodData) {
                    updateProgressBar(lastGoodData.raised, lastGoodData.goal);
                }

                countdown = scrapeInterval;
            });
    };

    fetchData(); // Initial fetch when the page loads

    setInterval(() => {
        countdown--;
        console.log(`Next scrape in ${countdown} seconds`);

        if (countdown <= 0) {
            fetchData(); // Fetch new data every 30 seconds
        }
    }, 1000); // Update countdown every second
});
