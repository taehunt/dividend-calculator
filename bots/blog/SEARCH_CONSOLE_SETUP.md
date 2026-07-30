# Search Console topic signal

The daily publisher can read the last 90 days of Search Console queries and use
the strongest relevant query as a topic-selection signal. If credentials are
missing or the API fails, publishing continues with the deterministic topic
rotation.

Required one-time setup:

1. Enable the Google Search Console API in a Google Cloud project.
2. Create a service account and a JSON key.
3. Add the service account email to the `sc-domain:yieldgrower.com` Search
   Console property with Restricted permission.
4. Save the complete JSON key as the GitHub Actions secret
   `GSC_SERVICE_ACCOUNT_JSON`.

The JSON key must never be committed to the repository.
