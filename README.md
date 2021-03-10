# Explore the Cosmos Client

The `Explore the Cosmos` application enables users to search NASA's vast repository of images using both NASA's public API and also
the Google Vision API.

The Google Vision API applies Google-generated
labels to each image, enabling the user to try
searches they might not have thought of. Google labels do not guarantee
a search result the way that NASA keywords do.

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

![Alt text](./readme/SearchScreen.jpg?raw=true "SearchScreen")

Note that selecting keywords or labels will generate an entirely new search using NASA's keyword API option. Google Vision labels do not guarantee results in the same way that NASA-generated keywords do. The more keywords and tags you select, the less likely you will get a successful result.
