# Enola Dashboard

Admin dashboard built with Next.js 15, React 19, and TypeScript.

## Local Development

Install dependencies:

```bash
npm ci
```

Run the app locally:

```bash
npm run dev
```

Default local environment is read from `.env.local`.

Required runtime variables for local work:

```env
BASE_URL_BACKEND=http://localhost:4000
SENTRY_DSN=
```

`SENTRY_DSN` is optional for local development.

## CI

GitHub Actions runs checks on:

- `push` to `main`
- `pull_request` targeting `main`

Checks are defined in [`.github/workflows/linter.yaml`](./.github/workflows/linter.yaml) and run:

- `npm run lint`
- `npm run typecheck`

## Deploy

Deploys are handled by GitHub Actions and AWS EC2 instances over SSH.

### QA

- Workflow: [`.github/workflows/deploy.yaml`](./.github/workflows/deploy.yaml)
- Automatic trigger: `push` to `main`
- Manual trigger: `workflow_dispatch` from any selected branch
- Service name in compose: `qa`

### Production

- Workflow: [`.github/workflows/deploy-production.yaml`](./.github/workflows/deploy-production.yaml)
- Manual trigger only
- Must be run from `main`
- Service name in compose: `production`

### Deploy Behavior

Each deploy workflow:

- checks out the selected commit
- builds and pushes a GHCR image unless `image_tag` is provided manually
- rewrites a single server-side `.env`
- runs `docker compose pull`
- runs `docker compose up -d --force-recreate`
- checks `http://127.0.0.1:3000/` on the target host

Rollback is done by running the workflow manually and setting `image_tag` to a previously pushed image tag, usually a commit SHA.

## GitHub Environment Setup

Two GitHub Environments are expected:

- `Deployments` for QA
- `Production` for production

### Environment Variables

Store these as GitHub Environment Variables:

- `SSH_HOST`
- `SSH_USER`
- `DEPLOY_PATH`
- `BASE_URL_BACKEND`
- `SENTRY_DSN`

### Environment Secrets

Store these as GitHub Environment Secrets:

- `GHCR_PAT`
- `SSH_KEY`

`SSH_KEY` must be the private SSH key used by GitHub Actions to connect to the target instance.

## Server Layout

Each instance should use a single `.env` file in the deploy directory.

The workflows assume:

- QA instance path is whatever `Deployments.DEPLOY_PATH` points to
- Production instance path is whatever `Production.DEPLOY_PATH` points to

`docker-compose.yml` reads runtime variables from `.env` for both `qa` and `production`.

## Sentry

Runtime Sentry config uses `SENTRY_DSN`.

Relevant files:

- [`src/instrumentation-client.ts`](./src/instrumentation-client.ts)
- [`sentry.server.config.ts`](./sentry.server.config.ts)
- [`sentry.edge.config.ts`](./sentry.edge.config.ts)

There is also a local file `.env.sentry-build-plugin` used only for `SENTRY_AUTH_TOKEN` during Sentry source map upload workflows. It is not part of runtime deploy configuration.
