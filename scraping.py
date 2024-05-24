import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, render_template
import time
import csv
from sqlalchemy import create_engine, text

app = Flask(__name__)
engine = create_engine('sqlite:///database.db', echo=True)
# For PostgreSQL, uncomment the following line and provide your credentials
# engine = create_engine('postgresql://user:pass@localhost:5432/database.db')

@app.route("/")
def home():
    # Render a welcome template (you need to have an index.html in the templates folder)
    return render_template('index.html')

@app.route('/data')
def get_data(): 
    query = text('SELECT * FROM data_table')
    with engine.connect() as conn:
        results = conn.execute(query).fetchall()
    results = [tuple(row) for row in results]
    return jsonify(results)

def fetch_page(url, retries=5, backoff_factor=0.3):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    for i in range(retries):
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
            return response.text
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            time.sleep(backoff_factor * (2 ** i))
    return None

def extract_celebrity_data(index_url):
    html = fetch_page(index_url)
    if not html:
        return []

    soup = BeautifulSoup(html, 'html.parser')
    
    # Locate the table
    table = soup.find('table')
    if not table:
        print("No table found on the page")
        return []

    rows = table.find_all('tr')[1:]  # Skip the header row

    celebrity_data = []
    base_url = "https://celebrityprivatejettracker.com"
    for row in rows:
        cells = row.find_all('td')
        if len(cells) > 1:
            plane_info = cells[1].get_text(strip=True)  # Get the plane info (tail registration)
            link_tag = cells[1].find('a')
            if link_tag:
                link = link_tag['href']
                full_link = base_url + link
                celebrity_data.append({
                    'plane_info': plane_info,
                    'link': full_link
                })
    
    return celebrity_data

def parse_celebrity_page(url):
    html = fetch_page(url)
    if not html:
        return None

    soup = BeautifulSoup(html, 'html.parser')
    try:
        tail_number = soup.find('div', class_='plane-info').get_text(strip=True)
        flight_date = soup.find('div', class_='flight-date').get_text(strip=True)
        departing_airport = soup.find('div', class_='departing-airport').get_text(strip=True)
        arriving_airport = soup.find('div', class_='arriving-airport').get_text(strip=True)
        fuel_used = soup.find('div', class_='fuel-used').get_text(strip=True)
    except AttributeError:
        return None  # Skip if the page doesn't contain the expected information

    return {
        'tail_number': tail_number,
        'flight_date': flight_date,
        'departing_airport': departing_airport,
        'arriving_airport': arriving_airport,
        'fuel_used': fuel_used
    }

def write_to_csv(data, filename='celebrity_planes.csv'):
    # Define the CSV columns
    csv_columns = ['plane_info', 'tail_number', 'flight_date', 'departing_airport', 'arriving_airport', 'fuel_used']
    
    # Write to CSV file
    try:
        with open(filename, 'w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            for row in data:
                writer.writerow(row)
    except IOError as e:
        print(f"I/O error occurred: {e}")

@app.route("/api/v1.0/planes")
def planes():
    index_url = 'https://celebrityprivatejettracker.com/celebrity-jets/'
    celebrity_data = extract_celebrity_data(index_url)
    plane_list = [data['plane_info'] for data in celebrity_data]
    return jsonify(plane_list)

@app.route("/api/v1.0/details")
def details():
    index_url = 'https://celebrityprivatejettracker.com/celebrity-jets/'
    celebrity_data = extract_celebrity_data(index_url)

    all_celebrity_data = []
    for data in celebrity_data:
        celebrity_page_data = parse_celebrity_page(data['link'])
        if celebrity_page_data:
            all_celebrity_data.append({
                'plane_info': data['plane_info'],
                'tail_number': celebrity_page_data['tail_number'],
                'flight_date': celebrity_page_data['flight_date'],
                'departing_airport': celebrity_page_data['departing_airport'],
                'arriving_airport': celebrity_page_data['arriving_airport'],
                'fuel_used': celebrity_page_data['fuel_used']
            })

    # Write the extracted data to a CSV file
    write_to_csv(all_celebrity_data)
    
    return jsonify(all_celebrity_data)

if __name__ == "__main__":
    app.run(debug=True)
