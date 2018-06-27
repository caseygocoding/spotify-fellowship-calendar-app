# Spotify fellowship - a calendar app

Deployment Link: https://spotify-caseychan-calendar.herokuapp.com/<br />
An awesome calendar app for Spotify fellowship with the following functionalities:

## Front End Features:

* Be able to create a new event on any day box.
* Event form contains start time, end time, description and submit.
* Once submit is clicked the form should disappear.
* Event appears in that day’s box after form submission.
* Show all events for the month by toggling.
* The application communicates with an API backend using JSON.
* Ability to switch between months
* Ability to view daily events
* Be able to update/delete events.
* Have 5 rows of 7 boxes with the correct date on the correct days for each month.

## Back End Features:

The API for the calendar includes the following:

#### API routes

* POST /events

  * Create a new event

* GET /events/:month/:year

  * Retrieve all events for the month

* DELETE /events/:id

  * Delete an event

* PUT /events/:id
  * Update an existing event
