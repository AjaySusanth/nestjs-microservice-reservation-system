# NestJS Microservice Reservation System

A structured NestJS monorepo implementing a reservation system split into dedicated microservices, with a shared common library, Dockerized development, and a conventional Node.js toolchain.

## Highlights
- Modular monorepo with clear domain-driven services
- Dockerized per-service setup with hot-reload for local dev
- Shared reusable library under `libs/common` with path alias `@app/common`
- Strong TypeScript setup (compiler options, path mapping, strict mode)
- ESLint + Prettier formatting and linting
- Jest testing configuration (unit + e2e scaffolding present)
- Automated container image build & push via GitHub Actions (matrix build)
- Kubernetes manifests for cluster deployment (`k8s/`)

## Tech Stack
- TypeScript (primary language)
- NestJS 11 (CLI-managed monorepo)
- Node.js
- Docker & Docker Compose
- GitHub Actions (CI for building/pushing service images)
- Kubernetes (manifests stored under `k8s/`)
- Jest (testing)
- ESLint + Prettier (code quality)

## Monorepo Layout
```
apps/
  auth/              # Authentication service
  notifications/     # Notifications service
  payments/          # Payments service
  reservations/      # Reservations service
libs/
  common/            # Shared library (import via @app/common)
k8s/
  reservation-system/  # Kubernetes manifests (directory present)
e2e/                 # End-to-end test scaffold
.github/
  workflows/ci.yml   # CI pipeline
docker-compose.yml
nest-cli.json
tsconfig.json
```

## Services and Ports (Docker Compose)
- reservations: `3000 -> 3000`
- auth: `3001 -> 3001`
- payments: `3002 -> 3002`
- notifications: `3003 -> 3003`

Each service:
- Has its own `Dockerfile` at `apps/<service>/Dockerfile`
- Uses an `.env` file (per service path) when run with Compose
- Mounts source for live reload during development

## GitHub Actions CI (Container Build & Push)
Workflow file: [.github/workflows/ci.yml](https://github.com/AjaySusanth/nestjs-microservice-reservation-system/blob/main/.github/workflows/ci.yml)

Confirmed behavior:
- Triggers on pushes and pull requests to `main`
- Matrix builds for: `auth`, `reservations`, `payments`, `notifications`
- Steps:
  1. Checkout repository
  2. (On push) Login to Docker Hub using `DOCKER_USERNAME` / `DOCKER_PASSWORD` secrets
  3. Build image with:
     ```
     docker build -f ./apps/${service}/Dockerfile \
       -t ${DOCKER_USERNAME}/${service}:latest \
       --target production .
     ```
  4. (On push) Push image: `docker push ${DOCKER_USERNAME}/${service}:latest`

Secrets required:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

This enables automatic fresh images for each microservice on merges to `main`.

## Getting Started

Prerequisites:
- Node.js & npm
- Docker + Docker Compose (for multi-service dev)
- (Optional) kubectl & a Kubernetes cluster (for manifests in `k8s/`)

Install dependencies:
```bash
npm install
```

Run a single service in watch mode:
```bash
# Replace <service> with one of: reservations | auth | payments | notifications
npm run start:dev <service>
```

Build all projects:
```bash
npm run build
```

Run with Docker Compose:
```bash
# Single service
docker compose up reservations

# Multiple
docker compose up reservations auth payments notifications

# Rebuild if needed
docker compose up --build
```

## Selected npm Scripts
- `build` — compile all projects
- `start` — start default app
- `start:dev <service>` — watch & reload specific service
- `start:debug` — debug mode
- `lint` — ESLint over apps/libs/tests
- `test` — Jest unit tests
- `test:watch` — Jest watch
- `test:cov` — coverage
- `test:debug` — debug tests
- `test:e2e` — e2e (scaffold present)

## Shared Library
- Alias: `@app/common` → `libs/common/src`
- Central place for shared constructs (DTOs, guards, utilities, etc.)

## Configuration Files
- `nest-cli.json` — declares each project & its tsconfig
- `tsconfig.json` — strict compiler options + path mapping
- `docker-compose.yml` — orchestration for local development
- `.github/workflows/ci.yml` — multi-service Docker image CI pipeline

## Language Composition
- TypeScript: 92.6%
- Dockerfile: 5.4%
- JavaScript: 2.0%

