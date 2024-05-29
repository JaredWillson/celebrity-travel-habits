from flask import Flask, render_template, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text, inspect
import psycopg2
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    # https://flask.palletsprojects.com/en/3.0.x/quickstart/#rendering-templates
    return render_template('index_merged.html')


@app.route('/flight_data')
def get_flights(): 
    db_params = {
        'dbname': 'celebrity_travel_habits',
        'user': 'postgres',
        'password': 'postgres',
        'host': 'localhost',
        'port': 5432
    }
        
    # Put in our database connection
    conn = psycopg2.connect(**db_params)
    
    # Now, create the cursor we need
    cursor = conn.cursor()

    # Define the query needed for the flights visualization

    
    query='''SELECT cel.celebrity_name celebrity_name,
            cel.celebrity_classification celebrity_classification,
            flts.tail_number tail_number,
            to_char(flts.dep_date_time, 'dd/mm/yyyy') dep_date,
            flts.dep_airport dep_airport,
            dep.airport_name dep_airport_name,
            dep.latitude dep_latitude,
            dep.longitude dep_longitude,
            flts.arr_airport arr_airport,
            arr.airport_name arr_airport_name,
            arr.latitude arr_latitude,
            arr.longitude arr_longitude,
            flts.fuel_gallons fuel_gallons
            FROM celebrity cel, flights flts, airports dep,
            airports arr, aircraft a
            WHERE cel.celebrity_id = a.celebrity_id
            AND a.tail_number = flts.tail_number
            AND dep.airport_code = flts.dep_airport
            AND arr.airport_code = flts.arr_airport;'''
    # Execute the query
    cursor.execute(query)
        
    # Fetch all rows from our executed query
    rows = cursor.fetchall()

    # Get our column names so we can put our returned list into a list of dictionaries
    column_names = [desc[0] for desc in cursor.description]

    # Now, lets put our column names and our cursor results into a list of dictionaries
    results = [dict(zip(column_names, row)) for row in rows]

    # Format our final result as a json
    json_results = json.dumps(results, indent=2)

    cursor.close
    conn.close()
    return json_results

@app.route('/destinations')
def get_destinations(): 
    db_params = {
        'dbname': 'celebrity_travel_habits',
        'user': 'postgres',
        'password': 'postgres',
        'host': 'localhost',
        'port': 5432
    }
        
    # Put in our database connection
    conn = psycopg2.connect(**db_params)
    
    # Now, create the cursor we need
    cursor = conn.cursor()

    # Define the query needed for the flights visualization

    
    query='''SELECT cel.celebrity_name celebrity_name,
            cel.celebrity_classification celebrity_classification,
            flts.tail_number tail_number,
            to_char(flts.dep_date_time, 'dd/mm/yyyy') dep_date,
            flts.arr_airport arr_airport,
            arr.airport_name arr_airport_name,
            arr.latitude arr_latitude,
            arr.longitude arr_longitude,
            flts.fuel_gallons fuel_gallons
            FROM celebrity cel, flights flts, 
            airports arr, aircraft a
            WHERE cel.celebrity_id = a.celebrity_id
            AND a.tail_number = flts.tail_number
            AND arr.airport_code = flts.arr_airport;'''
    # Execute the query
    cursor.execute(query)
        
    # Fetch all rows from our executed query
    rows = cursor.fetchall()

    # Get our column names so we can put our returned list into a list of dictionaries
    column_names = [desc[0] for desc in cursor.description]

    # Now, lets put our column names and our cursor results into a list of dictionaries
    results = [dict(zip(column_names, row)) for row in rows]

    # Format our final result as a json
    json_results = json.dumps(results, indent=2)

    cursor.close
    conn.close()
    return json_results

if __name__ == '__main__':
    app.run(debug=True)