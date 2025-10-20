/**
 * Global Jest setup for React Testing Library.
 * - Includes jest-dom matchers
 * - Sets sensible defaults for mock-mode env flags
 */
import '@testing-library/jest-dom';

// Default envs for mock-mode tests (can be overridden within individual tests)
process.env.REACT_APP_USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API ?? 'true';
process.env.REACT_APP_FEATURE_REALTIME = process.env.REACT_APP_FEATURE_REALTIME ?? 'false';
process.env.REACT_APP_FEATURE_AI_RECS = process.env.REACT_APP_FEATURE_AI_RECS ?? 'true';
process.env.REACT_APP_MOCK_API_DELAY_MS = process.env.REACT_APP_MOCK_API_DELAY_MS ?? '0';
