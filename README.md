# googlehome-nightscout

Implementation of language processsing Nightscout CGM and other home automation things.

# How to develop locally

+ Install gactions
+ Install ngrok

```
ngrok http 8080 (Note the URL and add it to all the httpExecution properties in action.json)
gactions preview --invocation_name <invocation_name> --preview_mins <minutes> action.json
npm install
node app.js
```

To add a new intent:

+ Create a new handler in intents/
+ Load the intent handler in app.js
+ Add the new intent to API.AI and make sure the intent name matches the name used in app.js
