# kanban-board

## Server

Navigate to `server` folder and run the `npm install` command and once it's done - the `npm start` command in the terminal in order to run the **Restify** server. You will get notified that `Server running on http://localhost:3000.`

## Client

Navigate to `client` folder and run the run the `npm install` command and once it's done - the `npm start` command in the terminal in order to run the **React app**. It will run on port `3001`.

## Usage

In order to create a new column you have to enter it's name inside the input field with the placeholder telling you to do so, and then - click the `Add Column` button.

In order to create a new card - click the `Add Card` button and a modal will open on the screen. There, once you enter the desired fields - click `Create Card` and it will be added to the selected column. You can use the `Close` button to close the modal and interrupt the card creation.

To filter cards - use the input field in the header. Just enter the text you expect to see in some cards title and they will be filtered.

To edit a card you simply have to click on the desired field to edit and change it's value, after that click the `Save Changes`.

To undo some cards' changes - click the undo button on that card and it will be returned to it's last history state.