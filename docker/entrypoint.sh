#!/bin/sh

# exit if any subcommand returns a non-zero status
set -e

find /usr/share/caddy/html -type f -name "*.js" -o -name "*.html" | xargs sed -i \
	-e "s|\"REACT_APP_API_BASE_URL\"|\"${REACT_APP_API_BASE_URL}\"|g" \
	-e "s|\"REACT_APP_TERM_URL\"|\"${REACT_APP_TERM_URL}\"|g" \
	-e "s|\"REACT_APP_PRIVACY_URL\"|\"${REACT_APP_PRIVACY_URL}\"|g" \
	-e "s|\"REACT_APP_OPEN_API_BASE_URL\"|\"${REACT_APP_OPEN_API_BASE_URL}\"|g" \
	-e "s|\"REACT_APP_WEBSITE_URL\"|\"${REACT_APP_WEBSITE_URL}\"|g"
exec "$@"
