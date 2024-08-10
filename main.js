document.addEventListener("DOMContentLoaded", function() {
    const raised = 4000;
    const goal = 22000;

    document.getElementById('raised').textContent = `$${raised.toLocaleString()} Raised`;
    document.getElementById('goal').textContent = `Goal $${goal.toLocaleString()}`;

    const progressPercentage = (raised / goal) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage.toFixed(2));
});
