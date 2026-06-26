# mern-cicd-kubernetes

A MERN-stack interior design web app (built using Antigravity) deployed through an end-to-end CI/CD pipeline I engineered myself — from a `git push` on GitHub to a live rollout on Kubernetes, including a custom Jenkins build agent, multi-stage Docker builds, and persistent MongoDB storage.

> **Note:** The application itself (`client/`, `server/`) was built using Antigravity. This repo's focus — and my contribution — is the **DevOps pipeline**: the custom Jenkins image, CI/CD automation, containerization, and the full Kubernetes deployment.

**Live app:** [interiorz-tan.vercel.app](https://interiorz-tan.vercel.app)

---

## 🚀 Pipeline Overview

```
Developer Push (GitHub)
        │
        ▼
   GitHub Webhook
        │
        ▼
  Jenkins Pipeline (jenkinsfile)
        │
        ├── Install deps + run tests (frontend & backend, parallel)
        ├── Build frontend (Vite build)
        ├── Build Docker images (client/Dockerfile, server/Dockerfile, parallel)
        ├── Push images → Docker Hub
        ├── Verify Kubernetes connection & secrets
        └── kubectl set image → rolling update on the cluster
                       │
                       ├── frontend Deployment + Service
                       ├── backend Deployment + Service (reads email-secret, connects to MongoDB)
                       ├── Ingress (routes / → frontend, /api → backend)
                       └── MongoDB Deployment + Service + PVC (persistent storage)
```

Every push to GitHub triggers a Jenkins build via webhook. Jenkins installs dependencies and runs tests for both frontend and backend in parallel, builds the frontend, builds separate Docker images for client and server, pushes them to Docker Hub, then rolls out the new images to the Kubernetes cluster using `kubectl set image` and waits for rollout to complete.

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Application | MERN (MongoDB, Express, React/Vite, Node.js) — built via Antigravity |
| Source Control | Git, GitHub |
| CI/CD | Jenkins — custom base image with Docker CLI + kubectl |
| Containerization | Docker (multi-stage builds for client & server), Docker Compose |
| Image Registry | Docker Hub (`premcloudops/my-frontend`, `premcloudops/my-backend`) |
| Orchestration | Kubernetes (Deployments, Services, Ingress, Secrets, PVC) |
| Storage | Kubernetes PersistentVolumeClaim (PVC) for MongoDB |
| Secrets Management | Kubernetes Secrets (`email-secret`), Jenkins Credentials Store (`dockerhub`) |
| Trigger | GitHub Webhooks |
| Frontend Hosting (demo) | Vercel |

---

## 🔧 What I Built (DevOps Scope)

### 1. Custom Jenkins Base Image (`dockerfile`)
Built on top of `jenkins/jenkins:lts`, with:
- **Docker CLI** installed, so Jenkins can build and push images
- **kubectl** installed, so Jenkins can deploy directly to the cluster
- Jenkins user added to the `docker` group for socket access
- Cluster `KUBECONFIG` mounted into the Jenkins container for cluster authentication

### 2. Application Containerization
- **`client/Dockerfile`** — multi-stage build: builds the Vite/React app, then serves the static output with **nginx**
- **`server/Dockerfile`** — Node.js 20 Alpine image running the Express backend
- **`docker-compose.yaml`** — spins up MongoDB locally with a persistent volume for development/testing

### 3. CI/CD Pipeline (`jenkinsfile`)
A declarative Jenkins pipeline that:
1. Checks out code on every webhook-triggered push
2. Installs frontend and backend dependencies **in parallel**
3. Runs frontend and backend tests **in parallel**
4. Builds the production frontend bundle
5. Builds the frontend and backend Docker images **in parallel**
6. Pushes both images to Docker Hub using credentials from **Jenkins Credentials Store** (`dockerhub`)
7. Verifies cluster connectivity and that required secrets exist
8. Rolls out the new images with `kubectl set image deployment/frontend` and `deployment/backend`
9. Waits for rollout to complete and verifies pods/services are healthy
10. Cleans the workspace, regardless of success or failure

### 4. Kubernetes Deployment (`k8s/`)
- **Frontend** — `frontend-deployment.yaml`, `frontend-service.yaml`
- **Backend** — `backend-deployment.yaml`, `backend-service.yaml` — reads DB connection and email credentials from a Secret, includes readiness/liveness probes
- **MongoDB** — `mongo-deployment.yaml`, `mongo-service.yaml`, `mongo-pvc.yaml` for persistent storage across pod restarts
- **Ingress** — `ingress.yaml` routes `/` to the frontend service and `/api` to the backend service
- **Secrets** — `email-secret.yaml` stores `EMAIL_USER` / `EMAIL_PASS`, injected into the backend pod as environment variables

### 5. Secrets & Credentials Handling
- Docker Hub credentials stored in **Jenkins Credentials Store**, referenced as `dockerhub` in the pipeline — never hardcoded
- Application secrets (email service credentials) stored as a **Kubernetes Secret** and injected into the backend Deployment via `secretKeyRef`

---

## 📂 Repository Structure

```
.
├── client/                          # React (Vite) frontend
│   └── Dockerfile                   # Multi-stage build → nginx
├── server/                          # Express + Node.js backend
│   └── Dockerfile
├── k8s/                             # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── mongo-pvc.yaml
│   ├── ingress.yaml
│   └── email-secret.yaml
├── dockerfile                       # Custom Jenkins image (Docker CLI + kubectl)
├── docker-compose.yaml              # Local MongoDB for dev/testing
├── jenkinsfile                      # CI/CD pipeline definition
├── package.json
└── README.md
```

---

## ▶️ Running Locally

```bash
git clone https://github.com/iampremkumarv/mern-cicd-kubernetes.git
cd mern-cicd-kubernetes

# Start MongoDB locally
docker-compose up -d

# Run backend
cd server && npm install && npm start

# Run frontend
cd ../client && npm install && npm run dev
```

## ☸️ Deploying to Kubernetes

```bash
kubectl apply -f k8s/
```

> Update image names in the Deployment manifests to point to your own Docker Hub repos, and create your own `email-secret` before applying.

## 🏗️ Building the Custom Jenkins Image

```bash
docker build -t custom-jenkins -f dockerfile .
docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins_home custom-jenkins
```

---

## 📈 What I Learned

- Building a custom Jenkins image with Docker CLI + kubectl so the CI server can act as its own deployment agent
- Writing a parallelized declarative Jenkins pipeline (install/test/build stages run concurrently for frontend & backend)
- Performing rolling updates on Kubernetes with `kubectl set image` and verifying rollout status before marking a build successful
- Managing secrets securely across two systems — Jenkins Credentials Store and Kubernetes Secrets
- Using readiness/liveness probes to make backend deployments self-healing
- Using PVCs to persist MongoDB data across pod restarts
- Writing multi-stage Dockerfiles (Vite build → nginx) for a lightweight production frontend image

---

## 👤 Author

**Premkumar V**
- LinkedIn: [linkedin.com/in/iampremkumarv](https://linkedin.com/in/iampremkumarv)
- GitHub: [github.com/iampremkumarv](https://github.com/iampremkumarv)
