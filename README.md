# Celebrity Flight Tracker

## Objective ##

This repository presents information on various celebrity flight data habits for the year from 5/29/2023 to 5/29/2024.  It seeks to compare the total miles flown and gallons of jet fule consumed by the rich and famous vs. US averages. As the world continuous to examine the effects of travel on global climate change, celebrity travel stands out as creating disproportional amounts of greenhouse emissions.  The visualizations we provide here should highlight this message.

### Instructions: ###
1. You will need a PostgreSQL database running locally to source the API's.  The file schema.sql contains the code required in PostgreSQL to create an appropriate schema. This approach was chosen rather than a SQLite database in order to ensure data integrity since the data source was not clean. You will then need to import the data files that correspond to the tables in PostgreSQL.  They are averages.csv, celebrity.csv, aircraft.csv, airports.csv, and flights.csv and must be imported in that order or you may run into foreign key dependency conflicts. All CSV's are stored in static/data subdirectory.  Futures versions of the repository will use Python dataframes for automated loads.


2. run `app.py` once to start the Flask application.  This will launch the required web server on the local client.  You will then be able to navigate to http://127.0.0.1 to see the completed webpage.

Note that Stackoverflow.com was used to help find a technique for executing a cursor against the PostgreSQL database and zipping up the results into a JSON using name/value pairs for the two endpoints.

Data were sourced from two locations:
- Celebrity flight data were sourced from https://celebrityprivatejettracker.com
- Airport latitude and longitude were sourced from https://github.com/datasets/airport-codes

### Ethica Considerations: ###
While flight tracking of aircraft by tail numbers is readily available public information, it is important to ensure that the data are not used for stalking and invading the privacy of celebrity individuals. As a result, the team made the conscious decision not to display real-time data even if they were available. The data can be used to examine the behavior of the various celebrities, but it would be possible using our website to meet celebrities at the airport and antagonize them.
