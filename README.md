# smart-gym-management--fitness-tracker-21010-21052

This workspace hosts the WebFrontend app (port 3000). The AdminPanel app (port 3001) resides in sibling workspace smart-gym-management--fitness-tracker-21010-21053.

- WebFrontend env: REACT_APP_API_BASE_URL, REACT_APP_USE_MOCK_API, REACT_APP_FEATURE_* flags
- AdminPanel env: REACT_APP_ADMIN_API_BASE_URL, REACT_APP_USE_MOCK_API, REACT_APP_FEATURE_* flags

Mock vs Real API:
- Toggle via REACT_APP_USE_MOCK_API=true|false in each app’s .env
- Mock APIs share the same response contracts and error shape normalization.