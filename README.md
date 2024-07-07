# luminous-zephyr

Find the perfect gift in seconds.

## Inspiration
We often find ourselves scrolling endlessly searching for the perfect product to get. Whether it is a gift for others or something we genuinely need, it is difficult to find the perfect fit for us. 
With AI technology and the vast variety of options on the TikTok Shop, there must be a better way to find exactly what we want with just natural spoken language.

## What it does
The Luminous Zephyr application aims to provide personalized product recommendations to users based on their natural language search queries using Artificial Intelligence (AI) techniques.

## How we built it

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for luminous-zephyr

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
