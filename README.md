# DD2476_Secondhand_search

## Install and run the project locally
In the following steps we direct you how to install and run our application on your local host. 

### Step 1 Install elastic search and kibana 
Follow steps 1-3 for the header Elastic search and steps 1-3 for the header Kibana from this website and make sure it is working: https://dev.to/elastic/downloading-elasticsearch-and-kibana-macos-linux-and-windows-1mmo 

### Step 2 Clone the project and import data through kibana

1. Find data to import:    
    * *scraping* --> and download *sample4.0-cta.json* and *sample4.0-wta.json*. 
2. Open up kibana in web browser. 
    - enter here: http://localhost:5601/ 
3. click on top left hamburger menu --> *analytics* --> *machine learning* --> *select file* 
    * And begin with selecting the downloaded file sample4.0-cta.json 
    * click on **import** and enter index name as **carsandtrucks**
4. Repeat step 3 for sample4-0-wta.json but enter index name as **wheels**. 
5. Restart elastic search and kibana servers in the terminals. 

### Step 3 NPM Install
1. Go to *project* and **npm install**. 
2. In the same folder write **npm start**. 
3. enter localhost:3000 in the web browser. 
