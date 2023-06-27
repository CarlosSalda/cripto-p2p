# CHANGELOG

## 2.0.0 (third tag)

Features:
  - Endpoints securized with JWT
  - Architecture test
  - env file for end-to-end tests.
  - Redis DB added for some services.
  - LOGS reflections added for endpoints
  - All registered users endpoint added

Fixes:
- Sample data now set the data by endpoints instead directly saving it in DB
- Fixed all not working endpoints
- Production fake binance endpoint fixed
- "production" env var behaviour swapped to "development"

## 1.1.0 (second tag)

Features:

  - add sell/buy list endpoint
  - create sell/but inention
  - adds a get cotization endpoint
  - adds swagger doc

Fixes:
- transaction confirmation missing DB record associated
- Enums now are in UPPER_CASE
- End-to-end tests

## 1.0.0 (first tag)

Features:
  - Complete model flow developed with Node.Js.
  - User registration endpoint with express
  - Railway CI/CD
  - Sonarcloud configured and working correctly
  - Tests available just executing the following command: `npm run test`