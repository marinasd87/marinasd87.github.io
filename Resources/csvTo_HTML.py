import pandas as pd
import csv

file_to_load = "/Users/marinaduarte/Documents/Web-Design-Challenge/WebVisualization/Resources/cities.csv"
dataDF = pd.read_csv(file_to_load)


html = dataDF.to_html()
print(html)