# Explore the Cosmos Client

## App Summary

The `Explore the Cosmos` application enables users to search NASA's vast repository of images using both NASA's public API and also the Google Vision API. The NASA API support includes both search text and keyword searches. The Google Vision API support provides Google-generated labels to each image, enabling the user to try keyword searches that they might not have thought of. In addition, a Carl Sagan quote is provided for every successful search.

## Live App

https://explore-the-cosmos-client.vercel.app

## APIs & Database Used

- NASA Images API (images.nasa.gov API): https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
  - q string
  - keywords
  - year_start
  - year_end
- Google Vision Detect Labels API: https://cloud.google.com/vision/docs/labels#vision_label_detection-nodejs
- Heroku Database: https://dashboard.heroku.com/apps/stormy-citadel-96294
  - 100 Carl Sagan quotes

## Welcome Screen

The landing page provides you with a random Carl Sagan quote that you can update by reloading the page. Select the 'Search the Cosmos' button to get started. Or select the 'About' link in the top-right corner of the screen to learn more about the application.

![Alt text](./readme/LandingPage.jpg?raw=true "LandingPage")

## Search Screen

The search screen provides you with several ways to search NASA's image repository:

- Enter search text (for example, 'Perseverance')
- Specify a date range from 1920 to current
- After selecting Submit:
  - Specify one or more NASA keywords
  - Specify one or more Google Vision labels

A new Carl Sagan quote is provided for every successful search.

![Alt text](./readme/SearchScreen.jpg?raw=true "SearchScreen")

After selection of a NASA keyword:

![Alt text](./readme/KeywordSearch.jpg?raw=true "KeywordSearch")

Note that selecting keywords or labels will generate an entirely new search using NASA's _keyword_ API option.

## Item Description Screen

You can click on any item from the results to retrieve information about the image. Select 'Go back to the search results...' button to navigate to the Search screen.

![Alt text](./readme/ItemDescription.jpg?raw=true "ItemDescription")

## About Screen

The About screen provides interesting details about Carl Sagan and NASA. In addition, it provides useful information on how to use the Explore the Cosmos application.

![Alt text](./readme/AboutScreen.jpg?raw=true "AboutScreen")

## Technology Used

- JavaScript
- React
- PostreSQL
- Node.js
- Express
- CSS/HTML
