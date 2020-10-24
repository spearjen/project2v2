#import necessary libraries
from flask import Flask, render_template, redirect
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from google.cloud import bigquery
import os

# import otherroute! which is another py file

try:
    # The typical way to import flask-cors
    from flask_cors import CORS
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask_cors import CORS



#create Flask app instance
app = Flask(__name__)
api = Api(app)
# cors=CORS(app, resources=r'smallSst.json', allow_headers='Content-Type')

@app.route("/")
# @cross_origin()
def index():
    return render_template("index-ok.html")

@app.route("/data")
# @cross_origin()
def data():
    return render_template("data.html")

@app.route("/cost")
# @cross_origin()
def cost():
    return render_template("cost.html")

# @app.route("/data")
# # @cross_origin()
# def data():
#     return render_template("windspeed_med_by_year.png")

# @app.route("/data")
# # @cross_origin()
# def data():
#     return render_template("landfall_count_by_year.pngl")

if __name__ == '__main__':
    app.run(debug=True, port = 1123)