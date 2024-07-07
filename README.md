# luminous-zephyr

Find the perfect gift in seconds.

## Inspiration

## What it does

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
