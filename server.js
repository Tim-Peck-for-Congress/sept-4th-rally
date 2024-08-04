const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

const extractNumericValue = (str) => {
  return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

const extractValues = (raisedStr, goalStr) => {
  return {
    raised: extractNumericValue(raisedStr),
    goal: extractNumericValue(goalStr)
  };
}

app.get('/scrape', async (req, res) => {
    console.log('Received request for donation data at:', new Date().toLocaleString());

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        const iframeUrl = 'https://secure.actblue.com/cf/embed/goal_tracker/rallyrsvp?host_origin=https%3A%2F%2Fsecure.actblue.com&embed_id=AB1';
        await page.goto(iframeUrl, { waitUntil: 'networkidle2' });

        const htmlContent = await page.content();
        fs.writeFileSync('iframe_page.html', htmlContent);

        const data = await page.evaluate(() => {
            const raisedElement = document.querySelector('.raised');
            const goalElement = document.querySelector('.goal');

            const raised = raisedElement ? raisedElement.textContent : 'N/A';
            const goal = goalElement ? goalElement.textContent : 'N/A';

            return { raised, goal };
        });

        const values = extractValues(data.raised, data.goal);

        await browser.close();

        console.log('Scraped donation data:', values);
        res.json(values);
    } catch (error) {
        console.error('Error fetching donation data:', error);
        res.status(500).json({ error: 'Error fetching donation data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
