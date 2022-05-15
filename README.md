
## Run develoment server
```bash
docker-compose up --build
```
Then go to `localhost:8000` for backend and `localhost:3000` for frontend.

When no changed is made, use:
```bash
docker-compose up
```

## Packages
Backend
* Django REST Framework with
    * `djangorestframework-simplejwt` for authentication

Frontend:
* React with:
    * `react-router-dom` for routing
    * `use-eazy-auth` for authentication
    * `react-rocketjump` for api
    * `bootstrap` as css framework


### Other uses:
```
docker-compose up -d --build

docker-compose exec backend python manage.py migrate

docker-compose exec backend python manage.py createsuperuser

docker-compose down --remove-orphans

docker-compose down -v
```
