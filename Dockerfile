FROM node:20 AS frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package*.json .

RUN npm install

COPY ./frontend .

RUN npm run build

FROM python:3.10

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

COPY --from=frontend-builder /app/frontend/build ./frontend/build

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
