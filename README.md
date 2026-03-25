# Project Antares

Project Antares is a movie booking application built with NestJS, TypeORM, Swagger, and PostgreSQL. Users can browse and book movies, view their bookings, and manage their profiles. Admins can manage the movies details, schedules a movie screening, and general user information.

## Tech Stack

- NestJS
- TypeORM
- Swagger
- PostgreSQL

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory and add the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_NAME=postgres
DB_SCHEMA=nest-product-be
DB_PASSWORD=fddsfsdfds
```

4. Build the application using `npm run build` to generate the TypeORM entities
5. Generate the migration script using `npm run migration:generate`
6. Run the migration script using `npm run typeorm migration:run`
7. Run the application using `npm run start`

## Usage

### Users

Users can browse and book movies, view their bookings, and manage their profiles. Admins can manage the movies details, schedule a movie screening, and general user information.

#### Endpoints

- `localhost:3000/_api/`: Swagger documentation
