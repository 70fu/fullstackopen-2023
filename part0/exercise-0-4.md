
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note, note="New note text"
    activate server
    Note left of server: The server adds the posted note to the note list
    server-->>browser: 302 Found, Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server
    Note right of browser: The browser reloads the tab

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [..., { "content": "New note text", "date": "2023-9-2" } ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```