DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS celebrity;
DROP TABLE IF EXISTS classifications;
DROP TABLE IF EXISTS airport;
DROP TABLE IF EXISTS averages;

CREATE TABLE flights (
	dep_airport VARCHAR(3) NOT NULL,
	arr_airport VARCHAR(255) NOT NULL,
    dep_date_time DATETIME,
    fuel_gallons FLOAT,
    celebrity_id VARCHAR NOT NULL,
    tail_number INT,
	PRIMARY KEY (tail_number)
);

CREATE TABLE celebrity (
	celebrity_id VARCHAR NOT NULL,
    celebrity_name VARCHAR (255) NOT NULL,
    celebrity_classification_id VARCHAR NOT NULL,
    PRIMARY KEY (celebrity_id),
);

CREATE TABLE classifications (
	celebrity_classification_id VARCHAR NOT NULL,
    celebrity_class VARCHAR NOT NULL,
    PRIMARY KEY (celebrity_classification_id),
);

CREATE TABLE airports (
	airport_code VARCHAR(4) NOT NULL,
    airport_name VARCHAR NOT NULL,
	longitude DEC,
    latitude DEC,
    PRIMARY KEY (airport_code),
);

CREATE TABLE averages (
	gallons DEC,
    miles DEC,
    PRIMARY KEY (celebrity_classification_id),
);