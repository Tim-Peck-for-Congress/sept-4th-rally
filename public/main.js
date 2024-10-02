document.addEventListener("DOMContentLoaded", function() {
    let inPersonDonations = 0, scrapeInterval = 30, countdown = scrapeInterval, lastGoodData = null, firstScrape = true, goal = 22000;
    let initialPlaceholderAmount = 5000; // Placeholder value to count up to before data is fetched

    /**
     * Animates the count-up of numbers from a start value to an end value.
     * @param {HTMLElement} element - The DOM element to update with the animated value.
     * @param {number} startValue - The initial value to start counting from.
     * @param {number} endValue - The target value to count up to.
     * @param {number} duration - The duration of the animation in milliseconds.
     */
    const animateCountUp = (element, startValue, endValue, duration) => {
        let startTime = null;
        const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (endValue - startValue) + startValue);
            element.textContent = `$${value.toLocaleString()} Raised`;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    /**
     * Updates the progress bar based on the raised amount and the fixed goal.
     * It animates from half the raised amount to the full raised amount.
     * @param {number} actBlueAmount - The total amount raised via ActBlue donations.
     */
    const updateProgressBar = actBlueAmount => {
        let raised = actBlueAmount + inPersonDonations;
        const raisedElement = document.getElementById('raised');
        const startValue = raised / 2; // Start at half of the raised amount for dramatic effect

        animateCountUp(raisedElement, startValue, raised, 1000);

        let progressPercentage = (raised / goal) * 100;
        let progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage.toFixed(2));
    };

    /**
     * Displays the loading spinner and hides the raised amount.
     */
    const showLoading = () => {
        document.getElementById('raised').style.display = 'none';
        document.getElementById('loading-spinner').style.display = 'block';
    };

    /**
     * Hides the loading spinner and shows the raised amount.
     */
    const hideLoading = () => {
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('raised').style.display = 'block';
    };

    /**
     * Fetches the latest fundraising data from the server and updates the UI.
     * Handles errors by showing a loading spinner when data cannot be retrieved.
     */
    const fetchData = () => {
        showLoading();
        fetch('/scrape')
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    lastGoodData = data;
                    updateProgressBar(data.raised);
                    hideLoading(); // Show the raised amount again
                    if (firstScrape) firstScrape = false;
                }
                countdown = scrapeInterval;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                countdown = scrapeInterval;
            });
    };

    // Start counting up to the placeholder amount on page load
    const raisedElement = document.getElementById('raised');
    animateCountUp(raisedElement, 0, initialPlaceholderAmount, 1000); // Initial placeholder animation

    fetchData();

    setInterval(() => {
        countdown--;
        countdown <= 0 && fetchData();
    }, 1000);
});
