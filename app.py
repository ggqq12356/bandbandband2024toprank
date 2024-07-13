import requests
import json
from dotenv import dotenv_values
from flask import Flask, render_template

# https://activity.17sing.tw/static_html/2024/team_variety/index.html
# ?uid=10213181
# &token=1sZBb8YFBkUcjVb2KZhEtLprtWoptZ3p3K_m5HEd0GX5moeClHSviHD-rf6LVXz_31_YJg6MvtypS0oPdlSPgb1rhJkk3a1bjNNGJWEWpAQdOTmeQst_R-S-usLYsIb3
# &aid=13189
# &lang=zh-Hant
# &visit_source=1002

# vote "https://activity.17sing.tw/team_variety/vote.php?uid=10213181&token=1sZBb8YFBkUcjVb2KZhEtLprtWoptZ3p3K_m5HEd0GX5moeClHSviHD-rf6LVXz_31_YJg6MvtypS0oPdlSPgb1rhJkk3a1bjNNGJWEWpAQdOTmeQst_R-S-usLYsIb3&device_id=&list_type=0&type=1&id=97&num=0&lang=zh-Hant&t=1720742370"

config = dotenv_values(".env")
url = "https://activity.17sing.tw/team_variety/rankList.php"
token = config["TOKEN"]

app = Flask(__name__, static_folder='static')
serverPort = 8080

def getRank(rankType):
  typeNumber = 0
  if rankType == "band": typeNumber = 1
  if rankType == "vocal": typeNumber = 2
  if rankType == "guitar": typeNumber = 3
  if rankType == "bass": typeNumber = 4
  if rankType == "drum": typeNumber = 5
  if rankType == "keyboard": typeNumber = 6
  if rankType == "player": typeNumber = 7
  
  params = "?token={}&from=0&list_type=1&type={}".format(token, typeNumber)
  req = requests.get(url + params)
  res = req.json()

  # response_status = res['response_status']
  response_data = res['response_data']

  data = {}
  for band in response_data['list']:
    # id = band['id']
    # name = band['name']
    rank = band['rank']
    # score = band['score']
    # image = band['image']
    # titbits = band['titbits']
    # image = band['image']
    data[rank-1] = band

  rankList = []
  for i in range(0, len(data)):
    band = data[i]
    rankList.append(band)
  
  return rankList

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/top/<rankType>")
def top(rankType):
    rankList = getRank(rankType)
    return json.dumps(rankList)

@app.route("/favicon.ico")
def favicon():
    return json.dumps({"state": True, "msg": "no favicon"})

# -------------------------------------- #

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=serverPort)