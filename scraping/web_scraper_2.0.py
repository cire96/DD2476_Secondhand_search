from requests import get
from bs4 import BeautifulSoup
import numpy as np
import json

list_car=[]
dict_car={}

catigorys = ["cta","wta","pta"]

locations=["inlandempire","lasvegas","orangecounty","sfbay","losangeles","sacramento","fresno","sandiego"]

#response = get('https://sfbay.craigslist.org/search/eby/apa?hasPic=1&availabilityMode=0')
#response = get('https://sfbay.craigslist.org/search/cta?s=0&query=car&sort=rel&purveyor-input=all') 
#https://sfbay.craigslist.org/search/cta?s=0&sort=rel&purveyor-input=all
# cars and truks: https://sfbay.craigslist.org/search/cta?s=0&purveyor-input=all&bundleDuplicates=1
#auto wheels and tires: https://sfbay.craigslist.org/search/wta?
#auto parts: https://sfbay.craigslist.org/search/pta?
# s=0 är bil 1-120 och s=120 är bil 121-240 sä en for loop som hoppar i = i + 120 där  init i = 0 !!! 
for n in range(len(locations)):

    response = get("https://"+locations[n]+".craigslist.org/search/pta?purveyor-input=all&bundleDuplicates=1")
    html_soup = BeautifulSoup(response.text, 'html.parser')


    results_num = html_soup.find('div', class_= 'search-legend')
    results_total = int(results_num.find('span', class_='totalcount').text)
    pages = np.arange(0, results_total+1, 120)#pages = np.arange(0, results_total+1, 120)


    posts = html_soup.find_all('li', class_= 'result-row')

    #print(type(posts)) #to double check that I got a ResultSet
    #print(len(posts)) #to double check I got 120 (elements/page)
    for j in range(len(pages)):

        print(locations[n]+" page: "+str(j)+" of "+str(len(pages)-1))


        response = get("https://"+locations[n]+".craigslist.org/search/pta?s=" + str(pages[j])+"&purveyor-input=all&bundleDuplicates=1" )

        html_soup = BeautifulSoup(response.text, 'html.parser')
        
        posts = html_soup.find_all('li', class_= 'result-row')

        
        for i in range(len(posts)):
            try:
                '''dict_car={}
                if(catigorys[n]=="cta"):
                    dict_car["category"]="cars and truks"
                elif(catigorys[n]=="wta"):
                    dict_car["category"]="auto wheels and tires"
                elif(catigorys[n]=="pta"):
                    dict_car["category"]="auto parts"'''

                dict_car["location"]=locations[n]

                post = posts[i]

                #title
                #title is a and that class, link is grabbing the href attribute of that variable
                post_title = post.find('a', class_='result-title hdrlnk')
                post_link = post_title['href']
                #easy to grab the post title by taking the text element of the title variable
                post_title_text = post_title.text

                dict_car["title"] = post_title_text


                #price
                post_price = post.div.find('span',class_='result-price').text
                price=int(post_price.strip().strip("$.").replace(",",""))
                dict_car["price"]=price

                #time
                post_time = post.find('time', class_= 'result-date')
                post_datetime = post_time['datetime']

                dict_car["datetime"] = post_datetime



                # **** Get infor from post it self
                inner_response = get(post_link)
                inner_html_soup = BeautifulSoup(inner_response.text, 'html.parser')
                try:
                    #Attribut IF sat need check if we have this
                    attrbs_group = inner_html_soup.find_all('p', class_= 'attrgroup')
                    product = attrbs_group[0].span.b.text
                    dict_car["product_name"] = product

                    
                    #check second atribute lsit exist or not
                    attrbs = attrbs_group[1].find_all('span')
                    for attrb in attrbs:
                        split_attrb=attrb.text.split(": ")
                        dict_car[split_attrb[0]] = split_attrb[1]
                except:
                    pass
                

                description = inner_html_soup.find_all('section', id = 'postingbody')[0].text
                dict_car["description"] = description


                list_car.append(dict_car.copy())
                
                #print(post_title_text)
            except:
                continue



    with open('sample4.0-pta.json', 'w') as outfile:
        for dict_car in list_car:
            json.dump(dict_car, outfile)
            outfile.write("\n")
#with open('sample.json', 'w') as outfile:
#    json.dump(list_car, outfile)


