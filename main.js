async function fetchDonationData() {
    const url = 'http://localhost:3000/scrape';

    console.log('Requesting donation data from backend at:', new Date().toLocaleString());
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Fetched donation data:', data);

        document.getElementById('total').textContent = data.raised;
        document.getElementById('goal').textContent = data.goal;
    } catch (error) {
        console.error('Error fetching donation data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDonationData();
    setInterval(fetchDonationData, 30000); // Refresh every 30 seconds
});
