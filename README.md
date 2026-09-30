# MERN Calculator

A React calculator served by an Express backend.

## Run locally

1. Install frontend dependencies and create the production bundle:

   ```powershell
   cd frontend
   npm install
   npm run build
   ```

2. Start the backend:

   ```powershell
   cd ../backend
   npm install
   npm start
   ```

3. Open `http://localhost:5000`.

The API health check is available at `http://localhost:5000/api/health`.

## MongoDB Atlas

MongoDB is optional for the current calculator functionality. To configure it:

1. Create a MongoDB Atlas project and a free shared cluster.
2. Create a database user with a username and password.
3. In **Network Access**, add the IP address `0.0.0.0/0` for Render access, or use a restricted allowlist if you manage Render egress IPs.
4. Copy the driver connection string and set `MONGODB_URI` to it. Replace the username, password, and database name. URL-encode special characters in the password.

## Render deployment

The included `render.yaml` creates one Node web service. It builds the existing Vite frontend, serves it from Express, and starts the API with `npm start`.

Set this Render environment variable:

- `MONGODB_URI`: your MongoDB Atlas connection string

After deployment, check `/api/health` and open the Render service URL.
