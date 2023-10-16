
# Movieflix

App that displays movies and series and allows you to keep track of your favorite ones. It supports 5 languages and the creation of different users and admins, protected route implementation, personal user profile page among other features.

Built using Angular and PrimeNg.

## Screenshots

### Recent popular movies
![image](https://github.com/DaniValero/movieflix/assets/114396949/049b5b1e-d334-47e3-9d8d-14dd0d2ab736)

### Search by genre
![image](https://github.com/DaniValero/movieflix/assets/114396949/9016fd70-fe21-49fb-a7bf-18dc7504c29c)

### Movie detail example
![image](https://github.com/DaniValero/movieflix/assets/114396949/c35c5532-02d3-4630-ab6f-f6031dcb423b)

### Serie detail example
![image](https://github.com/DaniValero/movieflix/assets/114396949/5d33d795-1087-49ff-a372-a61d4e1d32d2)

### User profile view
![image](https://github.com/DaniValero/movieflix/assets/114396949/30439e94-0160-4af9-a1d8-27301cad69ee)







## Getting Started

To get started with this project, you can follow the steps below:

- Clone the repository to your local machine.
- Install the dependencies by running on both folders
```bash
  npm install
```

- To start the server run
```bash
  npm run backend
```

- To start the client navigate to .\client\ and run 
```bash
  npm start
```
## Environment Variables

You will need to add the following environment variables to your environments.ts file

```bash
export const environments = {
  baseURL: 'http://localhost:4200',
  apiToken: 'Your_personal_MovieDB_Token'
  backendUrl: 'http://localhost:3000'
}
```


## Authors

- [@DaniValero](https://github.com/DaniValero)


