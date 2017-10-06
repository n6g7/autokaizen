# Auto Kaizen

Kaizen and defect tracking on **your** Trello board!

## Setup

- Clone this repo
- Create a new project in the [firebase console](https://console.firebase.google.com/u/0/)
- Run `firebase use --add` to attach this repo to your project
- Deploy with `yarn deploy`
- Set the functions config with:
  ```sh
  firebase functions:config:set app.allowed_domains="domain1.com,domain2.com"
  firebase functions:config:set app.trello_secret="trellosecret"
  firebase functions:config:set app.hook_url="https://us-central1-project.cloudfunctions.net/trelloHook"
  firebase functions:config:set app.base_url="https://domain.app/path"
  ```
