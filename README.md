# Music Search App (PP3)

## Project Overview:

This project is a music search application integrated with Spotify's REST Web API. Users can search for music, view results, & navigate to the Spotify web player.
The app requires user authentication using JWT tokens, the front and backend are decoupled with the backend handling authentication & environment variables securely.

## Features:

- User authentication via JWT
- Music search functionally using Spotify's API
- Display search results with clickable links to the Spotify web player
- "No Results" message when no search is performed or results are empty
- Secure handling of API credentials

## Prerequisites:
- Node.JS (v16+)
- NPM or Yarn package manager
- Spotify Developer Account

## Other Considerations
  Ports 3000, and 3001 must be open on host OS.

## Getting Started
1. git clone https://github.com/ChalmersSachi-FS/spotify-app-pp3
2. install dependencies npm install
3.set up environment variables:
  |SPOTIFY_CLIENT_ID=your_client_id
  SPOTIFY_CLIENT_SECRET=your_client_secret
  JWT_SECRET=your_jwt_secret|
4. start server: cd server npm run dev
   start client: cd client npm start
5.  Access the App
- Local Development: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
  
## Links:

- **GitHub Repository**: https://github.com/ChalmersSachi-FS/spotify-app-pp3.git
- **Spotify Developer Portal**: [https://developer.spotify.com](https://developer.spotify.com)
- **Live Demo (if applicable)**: [https://your-live-demo-link.com](https://your-live-demo-link.com)


## Updates:

3/5/2025

- Currently starting to code the project in VS Code.
TIME: 5:59pm Finish Backend within Server folder
<!-- Setting Up Express Server. -->
