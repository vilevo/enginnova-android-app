---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)

<!-- END_INFO -->

#Participant management

Apis for managing participants
<!-- START_784d61240bace74cc2a63b5e9706be67 -->
## Display a list of participant

> Example request:

```bash
curl -X GET -G "/api/participants" \
    -H "Authorization: Bearer {token}"
```
```javascript
const url = new URL("/api/participants");

let headers = {
    "Authorization": "Bearer {token}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{}
```

### HTTP Request
`GET /api/participants`


<!-- END_784d61240bace74cc2a63b5e9706be67 -->

<!-- START_069f98e3342f455ddbfac8b8cd77b5de -->
## Show one participant with specific key

> Example request:

```bash
curl -X GET -G "/api/participants/1" \
    -H "Authorization: Bearer {token}"
```
```javascript
const url = new URL("/api/participants/1");

    let params = {
            "key": "nihil",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{}
```
> Example response (404):

```json
{
    "error": true,
    "message": [
        "Le participant n'existe pas"
    ]
}
```

### HTTP Request
`GET /api/participants/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    key |  required  | The key of participant.

<!-- END_069f98e3342f455ddbfac8b8cd77b5de -->

<!-- START_2fa088b15ef21ecd838b07d45420e6c7 -->
## Update export file with list of participant

> Example request:

```bash
curl -X GET -G "/api/participants/majExportFile" \
    -H "Authorization: Bearer {token}"
```
```javascript
const url = new URL("/api/participants/majExportFile");

let headers = {
    "Authorization": "Bearer {token}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response:

```json
null
```

### HTTP Request
`GET /api/participants/majExportFile`


<!-- END_2fa088b15ef21ecd838b07d45420e6c7 -->

<!-- START_d79fba40c61a97a9e3c618c2c4822ab6 -->
## Upload Image for participant

> Example request:

```bash
curl -X POST "/api/participants/addImage" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_key":"necessitatibus","image":"ipsam"}'

```
```javascript
const url = new URL("/api/participants/addImage");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_key": "necessitatibus",
    "image": "ipsam"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "image": "http:\/\/localhost\/fenes_api\/public\/participant\/image.png"
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`POST /api/participants/addImage`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_key | string |  required  | The key of participant
    image | image |  required  | Image of participant

<!-- END_d79fba40c61a97a9e3c618c2c4822ab6 -->

<!-- START_de5fb9bc31dfbf38f15f0930ab395404 -->
## Create a participant

> Example request:

```bash
curl -X POST "/api/participants" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"last_name":"qui","username":"aut","phone_number":"labore","job":"ut","enterprise":"illo","biography":"vitae","quarter":"quia","competencies":[],"image":"maxime","first_name":"a","birth_date":"14-05-1995,","email":"eligendi","linkedin":"rerum","twitter":"quidem","facebook":"quis","website":"quia","interests":[]}'

```
```javascript
const url = new URL("/api/participants");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "last_name": "qui",
    "username": "aut",
    "phone_number": "labore",
    "job": "ut",
    "enterprise": "illo",
    "biography": "vitae",
    "quarter": "quia",
    "competencies": [],
    "image": "maxime",
    "first_name": "a",
    "birth_date": "14-05-1995,",
    "email": "eligendi",
    "linkedin": "rerum",
    "twitter": "quidem",
    "facebook": "quis",
    "website": "quia",
    "interests": []
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`POST /api/participants`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    last_name | string |  required  | Last name of participant
    username | string |  required  | Username of participant,
    phone_number | string |  required  | phone number of participant
    job | string |  required  | Job of participant
    enterprise | string |  required  | Where participant do his job
    biography | string |  required  | Biography of participant
    quarter | string |  required  | Quarter where live participant
    competencies | array |  required  | List of participant's competencies
    image | image |  required  | Profile image
    first_name | string |  optional  | First name of participant
    birth_date | date |  optional  | Birth date of participant
    email | string |  required  | Email of participant
    linkedin | string |  optional  | Linkedin link of participant
    twitter | string |  optional  | Twitter link of participant
    facebook | string |  optional  | Facebook link of participant
    website | string |  optional  | Website of participant
    interests | array |  optional  | List of participant's interests

<!-- END_de5fb9bc31dfbf38f15f0930ab395404 -->

<!-- START_b3b9d895f97d6720bacda3f43dbd55fe -->
## Search Participants by their competencies

> Example request:

```bash
curl -X POST "/api/participants/searchByCompetencies" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_id":18,"competencies":"\"PHP Design\""}'

```
```javascript
const url = new URL("/api/participants/searchByCompetencies");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_id": 18,
    "competencies": "\"PHP Design\""
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST /api/participants/searchByCompetencies`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_id | integer |  required  | Participant id
    competencies | string |  required  | Competencies separate by escape

<!-- END_b3b9d895f97d6720bacda3f43dbd55fe -->

<!-- START_31a7728b01ce17d02fbbefa40dfff195 -->
## Add competencies to participant

> Example request:

```bash
curl -X POST "/api/participants/addCompetencies" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_key":"voluptate","competencies":[]}'

```
```javascript
const url = new URL("/api/participants/addCompetencies");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_key": "voluptate",
    "competencies": []
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "message": [
        "Succès"
    ]
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`POST /api/participants/addCompetencies`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_key | string |  required  | Key of participant
    competencies | array |  required  | List of Competencies of participants

<!-- END_31a7728b01ce17d02fbbefa40dfff195 -->

<!-- START_28cbb07bedf741a852f97c655d426753 -->
## Add interests to participant

> Example request:

```bash
curl -X POST "/api/participants/addInterests" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_key":"optio","interests":[]}'

```
```javascript
const url = new URL("/api/participants/addInterests");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_key": "optio",
    "interests": []
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "message": [
        "Succès"
    ]
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`POST /api/participants/addInterests`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_key | string |  required  | Key of participant
    interests | array |  required  | List of interests of participants

<!-- END_28cbb07bedf741a852f97c655d426753 -->

<!-- START_3649981812638eabc110250f0a2c5eb2 -->
## Edit a participant

> Example request:

```bash
curl -X PUT "/api/participants/1" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"last_name":"non","first_name":"pariatur","username":"quis","birth_date":"14-05-1995,","email":"nesciunt","linkedin":"quo","twitter":"quia","facebook":"veritatis","website":"libero","phone_number":"dicta","job":"illo","enterprise":"rerum","biography":"enim","quarter":"quasi"}'

```
```javascript
const url = new URL("/api/participants/1");

    let params = {
            "key": "explicabo",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "last_name": "non",
    "first_name": "pariatur",
    "username": "quis",
    "birth_date": "14-05-1995,",
    "email": "nesciunt",
    "linkedin": "quo",
    "twitter": "quia",
    "facebook": "veritatis",
    "website": "libero",
    "phone_number": "dicta",
    "job": "illo",
    "enterprise": "rerum",
    "biography": "enim",
    "quarter": "quasi"
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "participant": "Object[Participant]"
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`PUT /api/participants/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    last_name | string |  required  | Last name of participant
    first_name | string |  optional  | First name of participant
    username | string |  required  | Username of participant,
    birth_date | date |  optional  | Birth date of participant
    email | string |  required  | Email of participant
    linkedin | string |  optional  | Linkedin link of participant
    twitter | string |  optional  | Twitter link of participant
    facebook | string |  optional  | Facebook link of participant
    website | string |  optional  | Website of participant
    phone_number | string |  required  | phone number of participant
    job | string |  required  | Job of participant
    enterprise | string |  required  | Where participant do his job
    biography | string |  required  | Biography of participant
    quarter | string |  required  | Quarter where live participant
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    key |  required  | The key of participant.

<!-- END_3649981812638eabc110250f0a2c5eb2 -->

<!-- START_7d8a0b3ae840ab2b3288bc67825b2ccf -->
## Delete a participant with specific key

> Example request:

```bash
curl -X DELETE "/api/participants/1" \
    -H "Authorization: Bearer {token}"
```
```javascript
const url = new URL("/api/participants/1");

    let params = {
            "key": "consequatur",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "participant": "Object[Participant]"
}
```
> Example response (404):

```json
{
    "error": true,
    "message": [
        "Le participant n'existe pas"
    ]
}
```

### HTTP Request
`DELETE /api/participants/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    key |  required  | The key of participant.

<!-- END_7d8a0b3ae840ab2b3288bc67825b2ccf -->

<!-- START_eed3881e52ed4982d7069b94e059f2da -->
## Remove competencies to participant

> Example request:

```bash
curl -X DELETE "/api/participants/competencies/delete" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_key":"vel","competencies":[]}'

```
```javascript
const url = new URL("/api/participants/competencies/delete");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_key": "vel",
    "competencies": []
}

fetch(url, {
    method: "DELETE",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "message": [
        "Succès"
    ]
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`DELETE /api/participants/competencies/delete`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_key | string |  required  | Key of participant
    competencies | array |  required  | List of Competencies of participants

<!-- END_eed3881e52ed4982d7069b94e059f2da -->

<!-- START_d08cf1bef28ebd7bb12e9025b6b63b77 -->
## Remove interests to participant

> Example request:

```bash
curl -X DELETE "/api/participants/interests/delete" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"participant_key":"sed","interests":[]}'

```
```javascript
const url = new URL("/api/participants/interests/delete");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "participant_key": "sed",
    "interests": []
}

fetch(url, {
    method: "DELETE",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
{
    "error": false,
    "message": [
        "Succès"
    ]
}
```
> Example response (404):

```json
{
    "error": true,
    "message": []
}
```

### HTTP Request
`DELETE /api/participants/interests/delete`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    participant_key | string |  required  | Key of participant
    interests | array |  required  | List of interests of participants

<!-- END_d08cf1bef28ebd7bb12e9025b6b63b77 -->


