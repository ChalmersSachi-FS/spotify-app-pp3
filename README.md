# Music Search App (PP3)

## Project Overview:
  This project is a music search application integrated with Spotify's REST Web API. Users can search for music, view results, & navigate to the Spotify web player. 
  The app requires user authentication using JWT tokens, the front and backend are decoupled with the backend handling authentication & environment variables securely.

  ## Features:
  * User authentication via JWT
  * Music search functionally using Spotify's API
  * Display search results with clickable links to the Spotify web player
  * "No Results" message when no search is performed or results are empty
  * Secure handling of API credentials

## Prerequisites:
Before running the project, ensure the following installed:
  * Node.JS (v16+)
  * NPM or Yarn package manager
  * Spotify Developer Account

## Getting Started
  ### 1. Clone Repo 
  git clone https://github.com/ChalmersSachi-FS/spotify-app-pp3
  cd spotify-app-pp3

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```plaintext
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
```

### 4. Start the Development Server
#### Backend
```bash
cd backend
npm run dev
```
#### Frontend
```bash
cd frontend
npm start
```

### 5. Access the App
- Local Development: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Links
- **GitHub Repository**: [https://github.com/your-username/music-search-app](https://github.com/your-username/music-search-app)
- **Spotify Developer Portal**: [https://developer.spotify.com](https://developer.spotify.com)
- **Live Demo (if applicable)**: [https://your-live-demo-link.com](https://your-live-demo-link.com)

## Milestones
### Week 1
- [x] Set up GitHub repository (public)
- [x] Create README.md
- [] Define project milestones using GitHub
- [] Create GitHub issues/tickets
- [] Implement backend API with environment variables

### Week 2
- [ ] Implement authentication using JWT
- [ ] Fetch and display search results from Spotify API
- [ ] Implement "No results" message

### Week 3
- [ ] Link search results to Spotify web player
- [ ] Secure API credentials

### Week 4
- [ ] Final testing and deployment

## Issues & Tickets
All project tasks and bugs are tracked under GitHub Issues. Check them here: [GitHub Issues](https://github.com/your-username/music-search-app/issues).

---

### Credits
Developed by [Sachi Chalmers] as part of the project assignment.
