# Publishing an article

Note: This assumes you already have an foi-help instance setup and are able to login to the backend.

1. Login to backend
2. Click "Content Manager" in left column
3. Click "Help Article" on new adjacent column
4. Click "Create New Entry" (alternatively: open the article you wish to edit)
5. Fill out form, and optionally upload singular "Media" to S3 (eg video)
6. Click "Save" in top right
7. Click "Publish" in top right (otherwise change won't appear)
8. Go to OpenShift Actions page, click "Frontend Deploy" on left (or, follow link: https://github.com/bcgov/foi-help/actions/workflows/web-deploy.yaml )
9. Click "Run Workflow", then in dropdown, select appropriate environment.  Note: This should correlate to the backend you logged into step #1.
10. Wait a few minutes, then change should be deployed.