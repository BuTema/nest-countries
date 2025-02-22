# Nest Country Project

## Description

This is a NestJS-based project that provides APIs for managing user calendars and retrieving country-related information. The project fetches public holidays from an external API and allows users to store them in their calendar.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/BuTema/nest-countries.git
   ```
2. Navigate to the project directory:
   ```sh
   cd nest-countries
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and define the following environment variables:

```
DATE_NAGER_BASE_URL=https://date.nager.at/api/v3
COUNTRIES_NOW_BASE_URL=https://countriesnow.space/api/v0.1
PORT=3000

DB_USERNAME=your-admin-username
DB_PASSWORD=yourDatabasePassword
DB_CLUSTER=your-cluster-name.mongodb.net

DB_URL_MODIFIER=+srv # If dev run
```

## Running the Application

### Development Mode

```sh
npm run start:dev
```

### Production Mode

```sh
npm run build
npm run start
```

## Testing

Run unit tests using Jest:

```sh
npm test
```

## API Endpoints

### User Calendar

- **Get User Calendar**
  ```
  GET /users/:userId
  ```
- **Add Holidays to User Calendar**
  ```
  POST /users/:userId/calendar/holidays
  ```
  **Request Body:**
  ```json
  {
    "countryCode": "US",
    "year": 2023,
    "holidays": ["Christmas"]
  }
  ```

### Countries

- **Get Available Countries**
  ```
  GET /countries
  ```
- **Get Country Info**
  ```
  GET /countries/:countryCode
  ```

## Technologies Used

- NestJS
- TypeScript
- Mongoose (MongoDB)
- Jest (Testing)
- Axios (HTTP Requests)

## License

This project is licensed under the MIT License.
