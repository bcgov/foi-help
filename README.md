[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

## foi-help
Freedom of Information modernization 

## Features

* Static-Site Generation.  All Help articles are generated once as build-time, so the site is performant and frontend users never wind up querying the Strapi backend.
* Secure.  By never exposing the Strapi backend to anything besides our build-time frontend, we ensure it's isolated from citizens and less exposed.

## Usage

## Requirements

## Installation

First, setup the DB.

```bash
docker-compose up -d
```

### Setup backend (Strapi)

Strapi must be setup first, as the frontend (NextJS) depends upon it.

```bash
cd backend/
yarn install
yarn develop
```

Once Strapi is setup, go and create a read only API token.


### Strapi Configuration

1. Login to Strapi, create initial admin user.
2. Create API Token in Strapi for NextJS to consume
   1. In Strapi: Settings > API Tokens > Create New API Token
   2. Name: read-help
   3. Token type: read-only
3. Make sure to copy the token down!  You will not be able to view it later.  If you lose the token, you must delete and re-do step #2.
4. TODO TODO - 
5. Put in `frontend/.env` as `STRAPI_READ_TOKEN`, and also set `STRAPI_READ_TOKEN` as the same base URL you logged into for step #1.


```ini
# example  frontend/.env
STRAPI_READ_TOKEN=long_token_here
STRAPI_API_URL=http://localhost:1337
```

### Setup Frontend (NextJS)

```bash
cd frontend/
yarn install
yarn dev
```

## Testing Production Builds Locally

```bash
cd backend/
yarn build
yarn start


# in another terminal, only after above is complete
cd frontend/
yarn build
yarn start
```

How is this different from running `yarn develop` / `yarn dev`?

* backend: Server's custom types are in read-only mode, cannot add new fields to models.
* backend: Server is faster
* frontend: All frontend pages are built-up front during `yarn build`, and then served during `yarn start`.  In contrast in dev, a page is built per load.
* frontend: This is a LOT faster at generating pages, BUT any changes you make in Strapi require a whole new rebuild.

In short, using `yarn build / start` is what we use in OpenShift, it is faster and more performant for end users, but more of a pain for developers.  Generally when you do development you will just use the development options as it's more convenient.  You can use the above to test OpenShift builds should work locally, and to measure performance differences.


## Project Status
The project is in the very early stages of development. The codebase will be changing frequently.

## Goals/Roadmap

## Getting Help or Reporting an Issue
To report bugs/issues/feature requests, please file an [issue.](https://github.com/bcgov/foi-help/issues)

## How to Contribute

If you would like to contribute, please see our [contributing](CONTRIBUTING.md)
guidelines. Please note that this project is released with a
[Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this
project you agree to abide by its terms.

## License

    Copyright 2021 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy
    of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations
    under the License.
