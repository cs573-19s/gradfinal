import gmaps
import gmplot
import pandas as pd
from IPython.display import IFrame
import certifi
import ssl
import geopy.geocoders
from geopy.geocoders import Nominatim

import numpy as np
from scipy import spatial
from flask import request

from sklearn.cluster import KMeans
import gmplot
import gmplot
from IPython.display import HTML
from geopy.geocoders import Nominatim
import certifi
import ssl
import geopy.geocoders
from geopy.geocoders import Nominatim
from flask import Flask, send_file
import flask
app = Flask(__name__)
crash = pd.read_csv("crash.csv")
from flask import Flask, render_template, flash, request
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField

@app.route('/')
def app_0():
    return "<style>.content{height:800px;} a{ color:#333333;text-decoration: none;} a:visited {" \
           "color:#333333} </style>" \
           "<br><br><br><br><br><h1 align='center'>Boston crash data analysis</h1> <br><br><br>" \
           "<p style='text-align:center'><a href='/six'><font size=5>crash data heatmap</a> <br>" \
           "<a href='/one' target='_blank'>High crash accident frequency area nearby </a><br>" \
           "<a href='/two' target='_blank'> Different road accident by times and days</a> <br> " \
           "<a href='/three' target='_blank'> </a> <br> " \
           "<a href='/four' target='_blank'> </a> <br> " \
           "<a href='/five' target='_blank'> </a></p> <br> "


@app.route('/two')
def app_2():
    return send_file("bar_chart.html")

@app.route('/six')
def app_6():
    geolocator = Nominatim()


    gmap = gmplot.GoogleMapPlotter(42.3301, -71.0589, 12.9)
    gmap.scatter(crash['lat'], crash['long'], '#ff0000', size=10, marker=False)
    gmaps.configure(api_key="AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA")
    gmap.apikey = "AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA"
    gmap.heatmap(crash['lat'], crash['long'])
    gmap.draw('map.html')
    IFrame('map.html', width=800, height=600)
    return send_file("map.html")

@app.route("/one", methods=['GET'])
def index():
    return '''<form action="/one" method="post">
          <label>Input your location:</label>
          <input type="number" name="latitude" value="42.339167">
          <input type="number" name="longitude" value="-71.094167">>
          <input type="submit">
          </form>'''



@app.route("/one", methods=['POST'])
def app_1():



    lat = request.form['latitude']
    long = request.form['longitude']
    userPos = [float(lat), float(long)]

    import gmaps

    import pandas as pd
    from IPython.display import IFrame
    import numpy as np
    from scipy import spatial
    import gmplot
    import certifi
    import ssl
    import geopy.geocoders
    from geopy.geocoders import Nominatim

    c = crash[['lat', 'long']]
    c = np.array(c)

    coord = '{0},{1}'.format(userPos[0], userPos[1])

    ctx = ssl.create_default_context(cafile=certifi.where())
    geopy.geocoders.options.default_ssl_context = ctx

    geolocator = Nominatim(scheme='http')
    location = geolocator.reverse(coord)
    print(userPos, location)

    kdtree = spatial.KDTree(c)
    n = kdtree.query_ball_point(userPos, 0.1)

    from sklearn.cluster import KMeans
    import gmplot
    from IPython.display import IFrame
    from geopy.geocoders import Nominatim

    geolocator = Nominatim()
    K = 10
    location = []
    kmeans = KMeans(n_clusters=K, random_state=0).fit(c[n])
    cluster = kmeans.cluster_centers_

    for i in range(K):
        coord = '{0},{1}'.format(cluster[i][0], cluster[i][1])
        loc = geolocator.reverse(coord)
        print(loc, coord)
        location.append(loc)

    gmap = gmplot.GoogleMapPlotter(userPos[0], userPos[1], 13)
    gmap.apikey = "AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA"
    gmaps.configure(api_key="AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA")
    gmap.scatter(cluster[:, 0], cluster[:, 1], 'red', size=150, marker=False)


    gmap.draw('map3.html')
    return send_file("map3.html")



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)