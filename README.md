# luminous-zephyr

Find the perfect gift in seconds.

Devpost Submission: [https://devpost.com/software/luminous-zephyr](https://devpost.com/software/luminous-zephyr)

Youtube: [https://youtu.be/jqGX1rI3F74](https://youtu.be/jqGX1rI3F74)

## Inspiration
We often find ourselves scrolling endlessly searching for the perfect product to get. Whether it is a gift for others or something we genuinely need, we are lost in the plethora of choices and often find ourselves difficult to decide what to purchase.

Shopping for products should not be a hassle! With AI technology and the vast variety of options on the TikTok Shop, there must be a better way to find exactly what we want with just natural spoken language. 

We, Lost Kids, have set on the journey to discover solutions to enhance shopping experiences!

## What it does
The Luminous Zephyr application aims to provide personalized product recommendations to users based on their natural language search queries using Artificial Intelligence (AI) techniques. Users can provide product descriptions to find suitable products. They may also select product Category and filter based on their budget.

## How we built it
We used React to build an intuitive frontend interface that interacts with the FastAPI backend. The backend also communicates with a Gemini model which pulls data from defined datasets housed in the backend.

## Challenges we ran into
In our initial design, our frontend fetches backend API, which visits Auth0's authentication URL and returns the session token as a JSON response. This was unsuccessful because the request from frontend's origin is blocked by Cross-Origin Resource Sharing (CORS) policy. We also could not make use of Auth0's CORS whitelist despite various attempts.

After learning from community posts, we summarised two reasons for this issue -

- Auth0's CORS whitelist does not work well with localhost
- Auth0's authentication API is not meant to be fetched with an XMLHttpRequest ([reference](https://community.auth0.com/t/domain-has-been-blocked-by-cors-policy-no-access-control-allow-origin/61515)), but rather, via a redirect or browser navigation ([reference](https://stackoverflow.com/questions/63776137/getting-a-cors-error-when-trying-to-authenticate-user-with-auth0)).

With these information, we decided to adjust our implementation. Instead of fetching the backend API, our frontend uses an anchor element which visits the backend API through browser navigation. The backend service will authenticate with auth0 and return a redirection response back to the frontend home page URL. Instead of passing the session token as JSON, the redirection response sets it as a cookie which helps to authenticate future requests.

## Accomplishments that we're proud of
- Successfully worked with Cookies to manage Authentication.
- Successfully linked frontend queries with backend and AI Model.
- Developed an AI Model to recommend suitable products for a given description and category of prompt.
- Our implementation demonstrates smooth integration with TikTok shop, where users can easily navigate to the product pages from our app. (DISCLAIMER: All TikTok data are strictly for testing and demonstration purposes, with each link visited with 5 seconds interval.)

## What we learned
- Frontend must consider how backend has been developed to make adjustment where required, while maintaining the User Interface and User Experience to expectations. A compromise between both sides may be required to ensure desired functionality as much as possible.
- Identify the various considerations for edge cases from user inputs (within reasonable behaviours), and come up with implementations to handle them, such as optional categories, not allowing minimum price to be higher that maximum price, and so on.
- Considerations to enhance code quality, be it for performance or readability, within the given timeframe.
- How to solve API Endpoint issues to route the app correctly.
- How to work with cookies and use JWT session tokens to ensure authenticated requests.
- How to use Google Cloud Platform (GCP) to deploy Luminous Zephyr app.

## What's next for luminous-zephyr
**Better integration with Tiktok shop**

Integration with Tiktok shop requires a deployed app. This was not the case when we started out. With our app already deployed, we hope to have better integration with Tiktok shop, by

* Pulling data directly from shops on Tiktok
* User authentication with Tiktok

**More fine-tuning of AI agent**

We hope to be able to add more in-between steps to better filter products, so that the results can suit the user better.

## Development

### Frontend

1. Install node dependencies.

```bash
npm install
```

2. Start the frontend development server.

```bash
npm start
```

### Backend

1. Make sure that you are using python version 3.10. Check your Python version with:

```bash
python --version
```

If you are using Anaconda/Miniconda, you can install the correct Python version in your virtual environment with:

```bash
conda install python=3.10
```

2. Install Python dependencies.

```bash
pip install -r requirements.txt
```

3. Put the environment file in root folder. The environment file should look like this:

```
GEMINI_API_KEY={your Gemini API key}
```

4. Start the backend development server.

```bash
uvicorn main:app --reload
```

## Deploy

Run the following command to boot up the server at port 80:

```bash
docker-compose up
```
