# PostsDemo

This project is fully dockerized, to start it just run `docker-compose up` and navigate to `http://localhost:4200/`.  

## Running unit tests

Run `ng test` in `/posts-demo` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Functionality

This app presents two different approaches to consume the Post API, a classic table and a dynamic map.
In both scenarios it's possible to do basic CRUD actions, it uses the same components to ensure the logic is not duplicated.

The form has validations to check the required fields are present and also the latitude and longitude fields stay between the logic range.

The list is updated whenever is updated, aswell as the dynamic map. It's possible to click on the map to see data about the post selected, and to locate the post in the map using the `Map` button.

## Improvements

To further expand this challenge, I would change the `Post` interface to a Class, with methods to serialize and deserialize the Post between backend and frontend.
It's necessary to implement a system to gracefully catch and show the errors during the CRUD actions.
It would be nice to be able to create posts doing a click over the map and showing the Post form with the coordinates already populated.

## Tech stack

- NodeJS 14.17.6
- Angular 12.1.5
- [Angular GoogleMaps 12.2.11](https://github.com/angular/components/tree/master/src/google-maps#readme)
- [Bulma 0.9.3](https://bulma.io/)
- [FontAwesome 5.15.4](https://fontawesome.com/)
