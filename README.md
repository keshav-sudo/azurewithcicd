# Testing Backend - Notes API

A simple RESTful API built with TypeScript, Express, and MongoDB for managing notes.

## Features

- CRUD operations for notes
- TypeScript for type safety
- MongoDB for data storage
- Multi-stage Dockerfile for optimized builds
- GitHub Actions CI/CD for Azure deployment

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a single note
- `POST /api/notes` - Create a new notevv  
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t testing-backend .

# Run container
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri testing-backend
```

## Push to Docker Hub

```bash
# Tag image
docker tag testing-backend your-dockerhub-username/testing-backend:latest

# Push to Docker Hub
docker push your-dockerhub-username/testing-backend:latest
```

## Azure Deployment

The GitHub Actions workflow will automatically:
1. Build the Docker image
2. Push to Docker Hub
3. Deploy to Azure Web App

### Required GitHub Secrets:
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password/token
- `AZURE_CREDENTIALS` - Azure service principal credentials

### Azure Credentials Setup:
```bash
az ad sp create-for-rbac --name "github-actions" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth
```

Add the output JSON to GitHub Secrets as `AZURE_CREDENTIALS`.

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
# azurewithcicd
