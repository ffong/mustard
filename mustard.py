#!/usr/bin/python

from flask import Flask, render_template, request
from youtube_mustard import nice_search

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
	q = request.form['query']
	search_results = nice_search(q)
	return render_template('index.html', search_results=search_results)

if __name__ == "__main__":
	app.run()

