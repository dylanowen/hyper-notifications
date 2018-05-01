# Hyper Notifications

Inspired by iTerm2 Triggers

The focus is triggering quickly on tons of output. This is why we use a string match instead of a regex.


`.hyper.js`
```
...
config: {
   ...
   notificationTriggers: [
      {
        string: "search string",
        title: "Ready",
        body: "Your server is ready"
      }
   ],
   ...
}
...
```