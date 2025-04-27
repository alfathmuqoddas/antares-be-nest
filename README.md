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
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nest_product
```

4. Run the migration script using `npm run typeorm migration:run`
5. Run the application using `npm run start`

## Usage

### Users

Users can browse and book movies, view their bookings, and manage their profiles. Admins can manage the movies details, schedule a movie screening, and general user information.

#### Endpoints

- `localhost:3000/_api/`: Swagger documentation
