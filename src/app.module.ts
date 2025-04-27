import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsModule } from './components/components.module';
import { Component } from './components/entities/component.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { ScreensModule } from './screens/screens.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingSeatsModule } from './booking_seats/booking_seats.module';

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
      entities: [Component, Category, User],
      synchronize: true,
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
