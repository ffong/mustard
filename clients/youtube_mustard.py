#!/usr/bin/python

from apiclient.discovery import build
from apiclient.errors import HttpError

YOUTUTBE_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
YOUTUBE_KEY = "AIzaSyAqSiPyvHmH7JWCJxv0DeTZSb3aQa2_NZE"

def search(query):
	y = build(YOUTUTBE_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_KEY)
	response = y.search().list(
		part = "snippet",
		q = query,
		type = "video",
		maxResults = 50
	).execute()
	return response

# extract videoid, image, title, and description
def parse(response):
	results = []
	for search_result in response.get("items"):
		result = {}
		result["videoId"] = search_result["id"]["videoId"]
		result["title"] = search_result["snippet"]["title"]
		result["description"] = search_result["snippet"]["description"]
		result["image"] = search_result["snippet"]["thumbnails"]["default"]["url"]
		results.append(result)
	return results

def nice_search(query):
	try:
		response = search(query)
		return parse(response)
	except HttpError, e:
		return e

if __name__ == "__main__":
	print nice_search("doggies")
