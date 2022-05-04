# FOI Help OpenShift

## backend-build

`backend-build.yaml` deploys Strapi.  This is an identical build between all environments.  It is built from `main` branch.  It will never be auto-deployed to prod, as that's rare and not necessary for content management tasks.  Deploying Strapi is only done after custom Strapi development, so we also require manual deployment too in the form of an `oc tag backend:test backend:prod`.

In contrast, NextJS is deployable to prod via CI/CD scripts.  This is so content managers can deploy updates to content in all environments without developer intervention.

## Build Strapi

```bash
oc process -f backend-build.yaml -o yaml | oc -n eeced3-dev apply -f - 

```

## Deploy Strapi
Create env file

```bash
# in dev/test/prod

# 1. Deploy postgres manually
# 2. Deploy secret
# 3. Deploy backend

# Deploy postgres manually via UI.

# Generate new secret (if required)
node generate-backend-deploy-envs.js > backend-deploy.dev.env

# Deploy secret
oc -n eeced3-dev create secret generic backend-secrets --from-env-file=backend-deploy.dev.env

# Deploy backend
oc process -f backend-deploy.yaml -o yaml | oc  -n eeced3-dev apply -f -
```

## Strapi Configuration

1. Login to Strapi, create initial admin user.
2. Create API Token in Strapi for NextJS to consume
   1. In Strapi: Settings > API Tokens > Create New API Token
   2. Name: read-help
   3. Token type: read-only
3. Make sure to copy the token down!  You will not be able to view it later.  If you lose the token, you must delete and re-do step #2.
4. Generate an OpenShift secrets in the tools environment for `strapi-${env}-secrets` for each env, eg `strapi-dev-secrets`.  (These must be in tools, as they are build time configs)


```bash
# You MUST replace `your_token_here` with the actual token from step #3.
oc -n eeced3-tools create secret generic strapi-dev-secrets --from-literal=STRAPI_READ_TOKEN=your_token_here
```

Reminder: You must also create `strapi-test-secrets` and `strapi-prod-secrets` (in the tools namespace) for builds for those environments too.

## NextJS Build

NextJS has 3 separate builds, one for each env (dev/test/prod).  Why?  The reason we do this is because it is necessary for static site generation.  At build time, NextJS will query the CMS to statically generate the files to deploy.  Thus, each separate NextJS build must point to a separate Strapi instance.  

STRAPI_API_URL is the same URL you used to login to step 1 in Strapi configuration.  Make sure not to include the trailing slash.

```bash
oc process -f frontend-build.yaml OUTPUT_TAG=dev STRAPI_API_URL=https://foi-help-backend-dev.apps.silver.devops.gov.bc.ca -o yaml | oc -n eeced3-tools apply -f -
```

## NextJS Deploy

```bash

oc process -f frontend-deploy.yaml -o yaml | oc -n eeced3-dev apply -f -

```