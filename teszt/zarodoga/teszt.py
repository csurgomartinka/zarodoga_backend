import requests
from bs4 import BeautifulSoup
import json
import mysql.connector
import time
import os
import re
from datetime import datetime


urls = [
    'https://www.programturizmus.hu/kategoria-fesztival.html',
    'https://www.programturizmus.hu/kategoria-vasarok.html',
    'https://www.programturizmus.hu/kategoria-unnepek.html',
    'https://www.programturizmus.hu/kategoria-szabadido.html',
    'https://www.programturizmus.hu/kategoria-kulturalis-program.html', 
    'https://www.programturizmus.hu/kategoria-csalad-gyerek.html',
    'https://www.programturizmus.hu/kategoria-gasztronomiai-program.html',
    'https://www.programturizmus.hu/kategoria-rendezveny.html'
]

try:
    requests.delete("http://localhost:3000/helyszinTorles")
    print("Sikeres helyszin törlés")
except Exception as e:
    print(f"hiba történt: {e}")

try:
    requests.delete("http://localhost:3000/esemenyTorles")
    print("Sikeres esemeny törlés")
except Exception as e:
    print(f"hiba történt: {e}")

try:
    requests.delete("http://localhost:3000/varosTorles")
    print("Sikeres varos törlés")
except Exception as e:
    print(f"hiba történt: {e}")

try:
    requests.post("http://localhost:3000/resetAutoIncrement")
    print("Sikeres resetAutoIncrement")
except Exception as e:
    print(f"hiba történt: {e}")

varosok = requests.get("http://localhost:3000/varosLista")
esemenyek = requests.get("http://localhost:3000/esemenyLista")
varosokjol = json.loads(varosok.text)
esemenyekjol = json.loads(esemenyek.text)

tipusid = 1
varososid = 1

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='esemenyek'
)
cursor = conn.cursor()


def process_date(date_str):
    datum_kezdet = ''
    datum_veg = '0001-01-01'

    if '-' in date_str:
        reszek = date_str.split('-')
        datumok = reszek[0].split('.')
        datumok2 = reszek[1].split('.')
        try:                
            datum_kezdethez = str(datumok[0]) + '-' + str(datumok[1]) + '-' + str(datumok[2])
            datum_kezdet = datetime.strptime(datum_kezdethez, '%Y-%m-%d').date()

            datum_veghez = str(datumok2[0]) + '-' + str(datumok2[1]) + '-' + str(datumok2[2])
            datum_veghez = datum_veghez.lstrip()
            datum_veg = datetime.strptime(datum_veghez, '%Y-%m-%d').date()

        except:
            atalakito = datumok[1].split(' ')
            match atalakito[1]:
                case "január":
                    honap = 1
                case "február":
                    honap = 2
                case "március":
                    honap = 3
                case "április":
                    honap = 4
                case "május":
                    honap = 5
                case "június":
                    honap = 6
                case "július":
                    honap = 7
                case "augusztus":
                    honap = 8
                case "szeptember":
                    honap = 9
                case "október":
                    honap = 10
                case "november":
                    honap = 11
                case "december":
                    honap = 12
            datum_kezdethez = str(datumok[0]) + '-' + str(honap) + '-' + str(atalakito[2])
            datum_kezdet = datetime.strptime(datum_kezdethez, '%Y-%m-%d').date()

            atalakito2 = datumok2[1].split(' ')
            match atalakito2[1]:
                case "január":
                    honap = 1
                case "február":
                    honap = 2
                case "március":
                    honap = 3
                case "április":
                    honap = 4
                case "május":
                    honap = 5
                case "június":
                    honap = 6
                case "július":
                    honap = 7
                case "augusztus":
                    honap = 8
                case "szeptember":
                    honap = 9
                case "október":
                    honap = 10
                case "november":
                    honap = 11
                case "december":
                    honap = 12
            datum_veghez = str(datumok2[0]) + '-' + str(honap) + '-' + str(atalakito2[2])
            datum_veghez = datum_veghez.lstrip()
            datum_veg = datetime.strptime(datum_veghez, '%Y-%m-%d').date()
    else:           
        #2025.01.11. (szombat)
        #2025. február 1. (szombat) 
        reszek = date_str.split('.')
        try:               
            datum_kezdethez = reszek[0] + '-' + reszek[1] + '-' + reszek[2]
            datum_kezdet = datetime.strptime(datum_kezdethez, '%Y-%m-%d').date()

        except:
            #2025 reszek[0]
            # február 1 reszek[1]
            datumok = reszek[1].split(' ')
            
            match datumok[1]:
                case "január":
                    honap = 1
                case "február":
                    honap = 2
                case "március":
                    honap = 3
                case "április":
                    honap = 4
                case "május":
                    honap = 5
                case "június":
                    honap = 6
                case "július":
                    honap = 7
                case "augusztus":
                    honap = 8
                case "szeptember":
                    honap = 9
                case "október":
                    honap = 10
                case "november":
                    honap = 11
                case "december":
                    honap = 12
            datum_kezdethez = str(reszek[0]) + '-' + str(honap) + '-' + str(datumok[2])
            datum_kezdet = datetime.strptime(datum_kezdethez, '%Y-%m-%d').date()
            
    return datum_kezdet, datum_veg



# URL-ek feldolgozása
for url in urls:
    print(f"Feldolgozás: {url}")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Események keresése
    events = soup.find_all('div', class_='tourism-list destination-list has-list-order')
    esemeny = soup.find_all('div',class_='tourism-list-item')
    
    for a in esemeny:
        datum = a.find('span',class_='tourism_time')
        try:
            datum_str = datum.get_text(strip=True)
        except:
            print("Nincs érték")
        
        try:
            datum_kezdet, datum_veg = process_date(datum_str)
        except:
            print("hiba: datum_kezdet, datum_veg")
        
        try:
            for b in datum:
                datumki = b
        except:
            print("hiba: datum")

        try:
            h3 = a.find('h3')
            nev = h3.find('a')
            event_name = nev.get_text(strip=True)
            event_link = "https://www.programturizmus.hu" + nev['href']
            helyszin = requests.get(event_link)
            helyszin_soup = BeautifulSoup(helyszin.text, 'html.parser')
            destination_div = helyszin_soup.find('div', class_='destination-address')
            reszletek_div = helyszin_soup.find('div', id='destination-text')
            reszletek = reszletek_div.get_text(separator='\n', strip=True)
            if reszletek == "":
                reszletek = "Hiányzó"
        except:
            print("hiba: reszletek")

        try:
            if destination_div:
                all_text = destination_div.get_text(separator=" ", strip=True)
            
            city_link = destination_div.find('a')
            if city_link:
                city_name = city_link.get_text(strip=True)
        except:
            print("hiba: city_name")

        try:
            street_name = "Nincs megadva"
            if "Több helyszínen" in all_text:
                street_name = "Több helyszínen"
            else:
                if "," in all_text:
                    parts = all_text.split(',')
                if len(parts) > 1:
                    street_name = parts[1].strip()
                if '(' in street_name:
                    street_name = street_name.split('(')[0].strip()         
        except:
            print("hiba: helyszin_nev")
        
        try:
            varososidja = 0
            varososid = 1
            
            for q in varosokjol:
                if q.get('vnev') == city_name:
                    varososidja = varososid
                else:
                    varososid += 1
        except:
            print("hiba: varososidja")
        
        try:
            if varososidja == 0 and "x" not in city_name:

                felvitel = "http://localhost:3000/varosFelvitel"
                response = requests.post(felvitel, json={"vnev":city_name}) 
                os.system('taskkill /F /IM node.exe')
                time.sleep(2)
                os.system("""start node C:\\Users\\diak\\Desktop\\szoftver
                          \\VNA\\24_zarodoga\\backend\\zarodoga_backend\\backend.js""")
                varosok = requests.get("http://localhost:3000/varosLista")
                varosokjol = json.loads(varosok.text)
                varososidja = varososid
                if response.status_code == 200:
                    print(f"Sikeres varosFelvitel")
                else:
                    print(f"Hiba történt: varosFelvitel")
        except:
            print("hiba: varosFelvitel")

        try:
            for c in nev:
                nevki = c
        except:
            print("hiba: nevki")

        try:
            varosok_dict = {p.get('vnev'): p.get('id') for p in varosokjol}            
            varosid = varosok_dict.get(city_name)
            if not varosid:
                varosid = max(varosok_dict.values(),default=0) + 1
        except:
            print("hiba: varosid")
        
        try:
            leiras = a.find('p',class_='tourism-descrition')
            for e in leiras:
                leiraski = e
        except:
            print("hiba: leiraski")

        try:
            esemenyTabla =  {
                'nev': nevki,
                'datum': datumki,
                'varosid': varosid,
                'tipusid': tipusid,
                'leiras': leiraski,
                'reszletek':reszletek,
                'datum_kezdet':str(datum_kezdet),
                'datum_veg':str(datum_veg)
            }
    
            felvitel = "http://localhost:3000/esemenyFelvitel"
            session = requests.Session()

            response = requests.post(felvitel, json=esemenyTabla) #timeout=30
            if response.status_code == 200:
                print(f"Sikeres esemenyFelvitel")
            else:
                print(f"Hiba történt: esemenyFelvitel")
        except:
            print("hiba: esemenyFelvitel")

        try:    
            if street_name == "" or street_name is None:
                street_name = "Nincs megadva"
            utolsoidurl = "http://localhost:3000/esemenyUtolsoID"
            response = requests.get(utolsoidurl)
            if response.status_code == 200:
                utolsoid = response.json()
                esemenyid = utolsoid[0].get('id')
            helyszinTabla =  {
                'helyszin_nev': street_name,
                'varosid': varososidja,
                'esemenyid': esemenyid
            }
    
            helyszinfelvitel = "http://localhost:3000/helyszinFelvitel"
            session = requests.Session()

            response = requests.post(helyszinfelvitel, json=helyszinTabla) #timeout=30
            if response.status_code == 200:
                print(f"Sikeres helyszinFelvitel")
            else:
                print(f"Hiba történt: helyszinFelvitel")
            
        except:
            print("hiba: helyszinFelvitel")


        '''
        print(nevki)
        print(datumki)
        print(varosid)
        print(tipusid)
        print(leiraski)
        print(reszletek)
        print(datum_kezdet)
        print(datum_veg)
        '''
       
        print("--------------------------------------------------------------------------------------------------------------------------------------")
    tipusid += 1
     

