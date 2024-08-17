
# Rally Web App

This is a Node.js web application that scrapes donation data from an embedded ActBlue goal tracker using Puppeteer and displays it on a webpage. The app uses Express for serving static files and setting up the API endpoint, and PM2 is used for managing the Node.js process in production.

## Table of Contents
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Managing the Server](#managing-the-server)
- [Dependencies](#dependencies)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/rally-web-app.git
   cd rally-web-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the `.env` file**:
   The application requires certain environment variables to be set, which are stored in a `.env` file. This file is not included in the repository for security reasons, so you'll need to create one yourself.

   **Create a `.env` file in the root of your project with the following content:**
   ```env
   SERVER_USER=yourusername
   SERVER_IP=your-vps-ip-address
   SERVER_PATH=/var/www/rally.timpeckforcongress.com
   ```

   - `SERVER_USER`: Your username on the VPS.
   - `SERVER_IP`: The IP address of your VPS.
   - `SERVER_PATH`: The path on the server where the app will be deployed.

4. **Running in Development Mode**:
   If you're running the app locally for development, you can start the server with:
   ```bash
   npm start
   ```

5. **Running the App with PM2**:
   To run the app in the background and make sure it restarts automatically, use `pm2`:
   ```bash
   pm2 start server.js --name rally-app
   ```

## Running the App

The application runs a server on port `3000`. By default, it serves an HTML page that displays the scraped data from ActBlue. The scraping is done through the `/scrape` API endpoint, which uses Puppeteer to fetch and parse the data.

After starting the server, open your browser and navigate to:
```
http://localhost:3000
```

## Environment Variables

The `.env` file is used to securely store and access sensitive information, like your server details. When deploying or running the app, these variables are loaded into the environment. 

Make sure your `.env` file includes the following variables:
- `SERVER_USER`: The username on the remote VPS server.
- `SERVER_IP`: The IP address of the remote VPS server.
- `SERVER_PATH`: The path to the directory where the app will be deployed.

For security reasons, **do not commit your `.env` file to version control**.

## Deployment

To deploy the application to your VPS server, you can use the provided `deploy.sh` script, which automates the process using `rsync` to sync the necessary files and restart the server using `pm2`.

1. **Ensure your SSH keys are set up** for passwordless login to your server. [Guide for setting up SSH keys](https://www.ssh.com/academy/ssh/copy-id).
2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

This script will:
- Sync `server.js`, `package.json`, and the `public/` directory to the server.
- Install any updated dependencies via `npm install`.
- Restart the server using `pm2`.

## Managing the Server

Once the app is running on your VPS, you can manage the server using `pm2`:

- **Restart the app**:
  ```bash
  pm2 restart rally-app
  ```

- **View logs**:
  ```bash
  pm2 logs rally-app
  ```

- **Check the status**:
  ```bash
  pm2 status
  ```

- **Make sure `pm2` starts on server reboot**:
  ```bash
  pm2 save
  pm2 startup
  ```

## Dependencies

- **Express**: Web framework for Node.js.
- **Puppeteer**: Headless Chrome Node.js API for web scraping.
- **PM2**: Production process manager for Node.js applications.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Open**: Utility to open URLs in the default browser (used for local development).



## Author

**Alex Bezuska**  
Campaign Volunteer, 2024  
[abezuska@gmail.com](mailto:abezuska@gmail.com)



## License

This project is dual-licensed:

1. **Code**: The code within this repository is licensed under the MIT License. You are free to use, modify, and distribute the code under the terms of the MIT License. See the [LICENSE](LICENSE_rally_web_app.md) file for details.

2. **Content and Assets**: All content, images, text, logos, and any other assets associated with the Tim Peck for Congress campaign included in this repository are proprietary and are the exclusive property of the Tim Peck for Congress campaign. These assets may not be used, copied, modified, or distributed without explicit written permission from the Tim Peck for Congress campaign.

By using or contributing to this repository, you agree to adhere to these terms.
