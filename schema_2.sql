-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/S5AkKC
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS aircraft;
DROP TABLE IF EXISTS celebrity;
DROP TABLE IF EXISTS airports;
DROP TABLE IF EXISTS averages;


CREATE TABLE "flights" (
    "dep_airport" varchar(4)   NOT NULL,
    "arr_airport" varchar(4)   NOT NULL,
    "dep_date_time" timestamp   NOT NULL,
    "fuel_gallons" float   NULL,
    "tail_number" varchar(32)   NOT NULL,
    CONSTRAINT "pk_flights" PRIMARY KEY (
        "dep_airport","arr_airport","dep_date_time","tail_number"
     )
);

CREATE TABLE "aircraft" (
    "tail_number" varchar(32)   NOT NULL,
    "celebrity_id" int   NOT NULL,
    CONSTRAINT "pk_aircraft" PRIMARY KEY (
        "tail_number"
     )
);

CREATE TABLE "celebrity" (
    "celebrity_id" int   NOT NULL,
    "celebrity_name" varchar(255)   NOT NULL,
    "celebrity_classification" varchar(255)   NULL,
    CONSTRAINT "pk_celebrity" PRIMARY KEY (
        "celebrity_id"
     )
);

CREATE TABLE "airports" (
    "airport_code" varchar(4)   NOT NULL,
    "airport_name" varchar(255)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    CONSTRAINT "pk_airports" PRIMARY KEY (
        "airport_code"
     )
);

CREATE TABLE "averages" (
    "gallons" float   NOT NULL,
    "miles" dec   NOT NULL,
    CONSTRAINT "pk_averages" PRIMARY KEY (
        "gallons"
     )
);

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_dep_airport" FOREIGN KEY("dep_airport")
REFERENCES "airports" ("airport_code");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_arr_airport" FOREIGN KEY("arr_airport")
REFERENCES "airports" ("airport_code");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_tail_number" FOREIGN KEY("tail_number")
REFERENCES "aircraft" ("tail_number");

ALTER TABLE "aircraft" ADD CONSTRAINT "fk_aircraft_celebrity_id" FOREIGN KEY("celebrity_id")
REFERENCES "celebrity" ("celebrity_id");

