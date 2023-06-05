# Dependencies

You will need a clean installation of [NodeJs](https://nodejs.org/en)
 and [Npm](https://www.npmjs.com/).\
 Before installing, a usefull tool to manage node versions would be ***[nvm](https://github.com/nvm-sh/nvm)***. 

 A database is also needed. In this project i am using [MySql](https://www.mysql.com/), but any other database can work with minor modifications.
 
 I would recommend you use a Virtual Environment to manage you development servers, databases and installations, to avoid poluting you native machine. Different versions of various projects can be hard to manage. My pick is [Vagrant](https://www.vagrantup.com/).


# Quick Start

Install node packages:
```bash
npm install
```
Please create a ```.env``` file to the root folder, and configure it as follows, ***according to your database***.
```
DATABASE_URL="mysql://events_api_user:password@localhost/events_api"

JWT_SECRET="cookies"
```

This project uses a JSON-like language to make schemas for the database. The Prisma ORM will also take care of migrations and other cool stuff. To get started:
```bash
npx prisma db push
npx prisma migrate dev
npx prisma generate
```

To run the application in dev mode:
```bash
npm run dev
```

You can check the server at\
[http://localhost:3001/](http://localhost:3001/)\
or visit the docs/client here [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/).

***Note:***\
While trying to authenticate with your JWT, using Swagger client, mind the CORS errors. A browser addon [like this one](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related) might be helpfull.

# Available Tools, Tech Appendix

### Tools
Instead of installing a database management program like MYSQL Workbench, Prisma provides us with one. It is simple but cool. To access it run
```bash
npx prisma studio
```
To debug your API check out this cool [API client for VSCode](https://www.thunderclient.com/) or use [insomnia](https://insomnia.rest/).

### Usefull Links

[nvm](https://github.com/nvm-sh/nvm)\
[nvm for windows](https://github.com/coreybutler/nvm-windows)\
[NodeJs](https://nodejs.org/en)\
[Npm](https://www.npmjs.com/)\
[Vagrant](https://www.vagrantup.com/)\
[MAMP server, windows](https://www.mamp.info/en/windows/)\
[Prisma](https://www.prisma.io/)\
[express.js](https://expressjs.com/)\
[typescript docs](https://www.typescriptlang.org/docs/)

### Terms

[JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)\
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

# ToDos

>Finish the implementation.

>Create a seed script for the db.

>Install TsDoc to document the codebase.

>Finish the Swagger docs 

Currently implemented for Swagger: 
- JWT authentication
- event creation. )

>Add unit testing.

>Add a Vagrantfile of an instance that runs a suitable Node environment, turn project into a kind of monorepo.

>Add a changelog.md file to keep track of changes.

> Additional things that could be refined:

- Code in Middlewares and handlers repeats itself, should be turned into functions/methods.

- Swagger can automatically generate Docs by parsing comments on the code, with package "swagger-jsdoc".\
***Keep in mind***, that would not be optimal if code is documentated with TSDoc,
and would need further consideration.

 