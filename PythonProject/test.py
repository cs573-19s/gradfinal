import gmaps
import gmplot
import pandas as pd
from IPython.display import IFrame
import numpy as np
from scipy import spatial
import gmplot
from IPython.display import HTML
from geopy.geocoders import Nominatim
import certifi
import ssl
import geopy.geocoders
from geopy.geocoders import Nominatim
from pyecharts import options as opts
from pyecharts.charts import Surface3D

#
# geolocator = Nominatim()
#
crash = pd.read_csv("crash.csv")
#
gmap = gmplot.GoogleMapPlotter(42.3301, -71.0589, 12.9)
gmap.scatter(crash['lat'],crash['long'],'#ff0000', size=10, marker=False)
gmaps.configure(api_key="AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA")

gmap.apikey = "AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA"
gmap.heatmap(crash['lat'],crash['long'])
gmap.draw('map.html')
IFrame('map.html',width=800,height=600)

c = crash[['lat','long']]
c = np.array(c)
lati = crash.lat.tolist()
longt = crash.long.tolist()
minla = np.min(lati)
maxla = np.max(lati)
minlo = np.min(longt)
maxlo = np.max(longt)
eps = [(np.max(lati) - np.min(lati)) / 10, (np.max(longt) - np.min(longt)) / 10]
points = []
for i in range(11):
    for j in range(11):
        points.append([minla + i * eps[0], minlo + j * eps[1]])

xlist = []
ylist = []
for i in range(11):
    xlist.append(minla + i * eps[0])
    ylist.append(minlo + j * eps[1])

# np.reshape(points, [11, -1])
print(len(points))

print(points[0])
results = np.zeros([11, 11], dtype=int)
for item in c:
    i = (item[0] - minla) // eps[0]
    j = (item[1] - minlo) //eps[1]
    i = int(i)
    j = int(j)
    results[i][j] += 1
print(results)


userPos=[42.339167, -71.094167]
coord= '{0},{1}'.format(userPos[0],userPos[1])
#
ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx
#
geolocator = Nominatim(scheme='http')
location = geolocator.reverse(coord)
print(userPos, location)

kdtree=spatial.KDTree(c)
n=kdtree.query_ball_point(userPos, 0.1)
print("points number:", len(n))
gmap = gmplot.GoogleMapPlotter(userPos[0], userPos[1], 12)
#samp = uber.sample(n=5000)
#gmap.scatter(samp[:,0],samp[:,1],'#ff0000', size=10, marker=False)
samp=c[n]
gmaps.configure(api_key="AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA")
gmap.apikey = "AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA"
gmap.heatmap(samp[:,0],samp[:,1])
gmap.draw('map2.html')

IFrame('map2.html',width=800,height=600)


from sklearn.cluster import KMeans
import gmplot
from IPython.display import IFrame
from geopy.geocoders import Nominatim

geolocator = Nominatim()
K=10
location=[]
kmeans = KMeans(n_clusters=K, random_state=0).fit(c[n])
cluster= kmeans.cluster_centers_

for i in range (K):
    coord= '{0},{1}'.format(cluster[i][0],cluster[i][1])
    loc= geolocator.reverse(coord)
    print(loc, coord)
    location.append(loc)

gmap = gmplot.GoogleMapPlotter(userPos[0], userPos[1], 13)
gmap.scatter(cluster[:,0],cluster[:,1],'#ff0000', size=200, marker=False)
gmap.marker(userPos[0], userPos[1],"yellow")
gmap.apikey = "AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA"
gmaps.configure(api_key="AIzaSyDaomlNTiEXSBRpeDZWw4qS2zbZSWsMnEA")
gmap.draw('map3.html')

IFrame('map3.html',width=800,height=600)
#
#
# import random
#
import random

from example.commons import Collector, Faker
from pyecharts import options as opts
from pyecharts.charts import Bar3D, Page

C = Collector()

print(results[1][2])
@C.funcs
def bar3d_base() -> Bar3D:
    data = [(i, j, int(results[i][j])) for i in range(11) for j in range(11)]

    c = (
        Bar3D()
        .add(
            "",
            [[d[1], d[0], d[2]] for d in data],
            xaxis3d_opts=opts.Axis3DOpts(xlist, type_="category"),
            yaxis3d_opts=opts.Axis3DOpts(ylist, type_="category"),
            zaxis3d_opts=opts.Axis3DOpts(type_="value"),
        )
        .set_global_opts(
            visualmap_opts=opts.VisualMapOpts(max_=1100),
            title_opts=opts.TitleOpts(title="Bar3D-Boston crash accident account"),
        )
    )
    return c

data = [(i, j, random.randint(0, 12)) for i in range(6) for j in range(24)]
print(data)
Page().add(*[fn() for fn, _ in C.charts]).render()




Page().add(*[fn() for fn, _ in C.charts]).render()
print([(i, j, results[i][j]) for i in range(0, 11) for j in range(0, 11)])
data = [(i, j, random.randint(0, 12)) for i in range(6) for j in range(24)]
print(data)
print(Faker.week_en)
print(xlist)

data = [[xlist[i], ylist[j], results[i][j]] for i in range(11) for j in range(11)]
bar3d=Bar3D()
bar3d.add(
    '',"Latitude","longtitude",data,
)
print(data)