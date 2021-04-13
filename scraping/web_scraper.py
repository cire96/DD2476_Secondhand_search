from requests import get
from bs4 import BeautifulSoup
import json

dict_car={}

response = get('https://sfbay.craigslist.org/search/eby/apa?hasPic=1&availabilityMode=0')
response = get('https://sfbay.craigslist.org/search/cta?query=car&sort=rel&purveyor-input=all')
html_soup = BeautifulSoup(response.text, 'html.parser')

posts = html_soup.find_all('li', class_= 'result-row')
print(type(posts)) #to double check that I got a ResultSet
print(len(posts)) #to double check I got 120 (elements/page)

post = posts[0]

#title
#title is a and that class, link is grabbing the href attribute of that variable
post_title = post.find('a', class_='result-title hdrlnk')
post_link = post_title['href']
#easy to grab the post title by taking the text element of the title variable
post_title_text = post_title.text

dict_car["title"] = post_title_text


#price
post_price = post.a.text
price=float(post_price.strip().strip("$").replace(",","."))

dict_car["price"]=price

#time
post_time = post.find('time', class_= 'result-date')
post_datetime = post_time['datetime']

dict_car["datetime"] = post_datetime



# **** Get infor from post it self
response = get(post_link)
html_soup = BeautifulSoup(response.text, 'html.parser')

#Attribut
attrbs_group = html_soup.find_all('p', class_= 'attrgroup')
product = attrbs_group[0].span.b.text
dict_car["product_name"] = product

dict_attrb={}
attrbs = attrbs_group[1].find_all('span')
for attrb in attrbs:
    split_attrb=attrb.text.split(": ")
    dict_attrb[split_attrb[0]] = split_attrb[1]

dict_car["attributs"] = dict_attrb


description = html_soup.find_all('section', id = 'postingbody')[0].text
dict_car["description"] = description

#print(dict_car)

json_car=json.dumps(dict_car)

print(json_car)





