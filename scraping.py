#import dependencies
from splinter import Browser
from bs4 import BeautifulSoup

#set up the browser
browser = Browser('chrome')
url = 'https://celebrityprivatejettracker.com/#gref'

#create the session
browser.visit(url)

#intiate html session
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

#scraping the table (class is entry-content)
table_info = soup.find_all(class_='entry-content')
table_info

table_list =[]

for plane in table_info:
    table_list.append(plane.a['href'])
    
table_list


#automate clicking/finding the next page
browser.links.find_by_partial_text('-n').click()



#start the loop of grabbing the info from the pages
for x in range(1, 4):
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    table_info = soup.find_all(class_ = 'image_container')
    print('page:', x, '----------')
    for plane in table_info:
        print(plane.a['href'])
    browser.links.find_by_partial_text('next').click()
    
#figure out how to automate clicking the link of the aiirplanes instead of clicking a next button
#maybe find the
