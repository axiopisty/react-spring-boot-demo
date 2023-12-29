# Bug Tracker

This project demonstrates creating a full-stack application using
a [React](https://react.dev/) frontend and a 
[spring-boot](https://start.spring.io/) backend. This application is
more of a proof of concept than anything else. Only the happy path
has been implemented. There are no automated tests or validations.
Even error handling is minimal. The goal of this project is to
demonstrate how to create a full-stack application using React and
Spring Boot. It is not intended to be a production ready application.

The application simulates the functionality of a basic system bug
tracker. It allows you to create, read, update, and delete issues.

## System Requirements / How to build and run the application

This application is built using Maven and requires Java 21. If you do not
have those tools installed, I recommend you use [SDKMAN](https://sdkman.io/)
to install them.

For example:

```shell
$ curl -s "https://get.sdkman.io" | bash
$ sdk install java 21.0.1-graalce
$ sdk install maven 3.9.6
```

Once you have the prerequisites installed, you can build and run the
application using the following commands:

```shell
$ mvn clean install
$ java -jar backend-server/target/backend-server-0.0.1-SNAPSHOT.jar
```

`mvn clean install` uses the [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
to make the appropriate version of node and npm available for the project build.
Note that npm and node do not need to previously have been installed on the machine. Then
npm is used to build the frontend react application and the `maven-antrun-plugin`
copies the built react application from `frontend/dist/*` into the 
`backend-server/target/classes/static/` directory, where it is available to be served 
as static content from within the spring boot web application.

After running the `java -jar` command you should see the server logs in the terminal.
Once you see the log message that says "Started Main in <time>", you
should be able to access the application at [http://localhost:8080](http://localhost:8080).
After you're done playing (testing) the application you can stop the server by
pressing `ctrl-c` in the terminal window where you executed the `java -jar` command.

## Alternative way to run the application

If you have docker installed on your machine and you prefer to run the application 
within a docker container, you can do so after successfully building the application 
using the following commands:

```shell
$ mvn clean install
$ docker compose up -d --build && docker compose logs -f bug-tracker
```

Once again, you can access the application at [http://localhost:8080](http://localhost:8080). 
When you're done, you can stop the application by running the following command:

```shell
$ docker compose down
```

## File Organization

There are 2 noteworthy directories in this project. They are:
1. backend-server
 
       This directory contains the source code for the backend application
       written in Java with Spring Boot. It uses an H2 (in memory) database.
       This application is a reactive application. There is no blocking IO.
       Even the database interactions are non-blocking using R2DBC.
 
2. frontend

        This directory contains the source code for the frontend application
        written in React/Node. It provides the user interface to enable an
        end user to perform CRUD operations on issues (ie: the bug-tracker).
