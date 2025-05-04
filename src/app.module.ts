import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsModule } from './modules/components/components.module';
import { Component } from './modules/components/entities/component.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './modules/categories/entities/category.entity';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { TheatersModule } from './modules/theaters/theaters.module';
import { ScreensModule } from './modules/screens/screens.module';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { SeatsModule } from './modules/seats/seats.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingSeatsModule } from './modules/booking_seats/booking_seats.module';
import { Movie } from './modules/movies/entities/movie.entity';
import { Theater } from './modules/theaters/entities/theater.entity';
import { Screen } from './modules/screens/entities/screen.entity';
import { Showtime } from './modules/showtimes/entities/showtime.entity';
import { Seat } from './modules/seats/entities/seat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest-product-be',
      entities: [
        Component,
        Category,
        User,
        Movie,
        Theater,
        Screen,
        Showtime,
        Seat,
      ],
      synchronize: true,
      timezone: 'Z',
    }),
    ComponentsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    TheatersModule,
    ScreensModule,
    ShowtimesModule,
    SeatsModule,
    BookingsModule,
    BookingSeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
