from requests import get
from bs4 import BeautifulSoup

response = get('https://sfbay.craigslist.org/search/eby/apa?hasPic=1&availabilityMode=0')
response = get('https://sfbay.craigslist.org/search/cta?query=car&sort=rel&purveyor-input=all')
html_soup = BeautifulSoup(response.text, 'html.parser')

posts = html_soup.find_all('li', class_= 'result-row')
print(type(posts)) #to double check that I got a ResultSet
print(len(posts)) #to double check I got 120 (elements/page)

#price
post_one = posts[0]
post_one_price = post_one.a.text
price=float(post_one_price.strip().strip("$").replace(",","."))
print(type(price))

#time
post_one_time = post_one.find('time', class_= 'result-date')
post_one_datetime = post_one_time['datetime']
print(post_one_datetime)

#title
#title is a and that class, link is grabbing the href attribute of that variable
post_one_title = post_one.find('a', class_='result-title hdrlnk')
post_one_link = post_one_title['href']

#easy to grab the post title by taking the text element of the title variable
post_one_title_text = post_one_title.text
print(post_one_title_text)



response = get(post_one_link)
html_soup = BeautifulSoup(response.text, 'html.parser')

#Attribut
attrbs_group = html_soup.find_all('p', class_= 'attrgroup')
attrbs_one = attrbs_group[0]
attrbs = attrbs_group[1].find_all('span')

print(attrbs_group[0].span.b.text)

print(attrbs[1].text.split(": "))

description = html_soup.find_all('section', id = 'postingbody')[0].text
print(description)


