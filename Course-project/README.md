# NodeJS robot_dreams course, Oct-Dec 2024
## Course project: variant #2
### Developer: Oleksandr Poshtaruk

### To run project
#### a) As standalone service
```
npm start
```
*Note: you should run docker-compose first for redis/postgres/redis-commander
Do not forget to comment out "app"in docker-compose.yml file and after that start "docker-compose up" prior to running nestjs app.

#### b) As part of docker compose config
```
docker-compose up --build
```

### To run tests
```
npm run test
```
