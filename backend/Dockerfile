FROM python:3.9.5-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip3 install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /app/backend
COPY ./scripts/ /app/

# Make port 8000 available for the app
ENV PORT 8000
EXPOSE 8000

RUN ["chmod", "+x", "/app/entrypoint-dev.sh"]
ENTRYPOINT [ "/app/entrypoint-dev.sh" ]