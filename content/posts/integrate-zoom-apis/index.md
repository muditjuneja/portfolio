---
title: "How to integrate Zoom APIs in your applications?"
date: 2020-05-02
slug: "/how-to-integrate-zoom-apis-in-your-applications"
canonicalUrl: "https://muditjuneja.medium.com/how-to-integrate-zoom-apis-in-your-applications-d36daecbd829"
---


![Leverage the power of Zoom in your applications.](https://miro.medium.com/max/2488/1*EMygjhZwxFGY0osKpy9_Xw.png)Image credits: [marketplace.zoom.us](https://marketplace.zoom.us/)



So here we will discuss how can we integrate ZOOM.US in any application to create and schedule video meetings. Just like any other application, Zoom is also following RESTful architecture and has exposed its APIs that are accessible via HTTP at specified URLs for specified resources. Here we will be covering 2 resources :

1.  **Users**: This type of resource is used to manage the users who will be able to schedule meetings via Zoom. According to Zoom support, They do not allow a user to host multiple meetings at the same time. Check [here](https://support.zoom.us/hc/en-us/articles/206122046-Can-I-Host-Concurrent-Meetings-) for more information.

> Let’s take an example to understand it better. If you have a use case in which various teachers want to conduct classrooms at the same time then you need to have multiple users in your accounts and those users will act as hosts for meetings. This resource is available at this URL: [https://api.zoom.us/v2/users](https://api.zoom.us/v2/users)

2\. **Meetings**: This is the resource of interest here. Zoom allows one to schedule meetings on behalf of different hosts.

> This resource is available at this URL: [https://api.zoom.us/v2/user/{userId}/meetings](https://api.zoom.us/v2/meetings). We will learn more about the param {userId} later in this article.

Before going further, it would be great if you can get your hands on official Postman collection available on this link :

> [https://marketplace.zoom.us/docs/guides/tools-resources/postman/using-postman-to-test-zoom-apis](http://Using Postman to Test Zoom APIs)

This  collection is having many APIs exposed for various resources provided by Zoom.

For using the APIs, one needs to create a JWT application in Zoom Market place. So, What is JWT or JSON web token?

> **_JSON Web Tokens are an open, industry-standard_** [**_RFC 7519_**](https://tools.ietf.org/html/rfc7519) **_method for representing claims securely between two parties._** — [JWT.io](https://jwt.io/)

This is a bit technical but apt. In simple terms, JWTs are base64 encoded strings that are passed via headers in an HTTP call be it POST, GET, PUT, etc. It allows authentication/authorization of the user who is trying to access the resources from some other application server. In this case, it will be Zoom servers where they are maintaining the data related to meetings and users, and many other resources.

> To create a JWT application in the market place, please follow this detailed article from Zoom. [https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app)

After creating the application, you will have access to the **Secret key** and **API key** with which you will generate tokens and pass in your API requests.

> N**ote: _It is highly recommended to set the exp timestamp for a short period, i.e. a matter of seconds. This way, if a token is intercepted or shared, the token will only be valid for a short period._** _—_ [_Zoom_](https://marketplace.zoom.us/docs/guides/auth/jwt)

Here is the code snippet for generating the tokens in Node.js :

```
const jwt **\=** require('jsonwebtoken'); // npm package link [here](https://www.npmjs.com/package/jsonwebtoken)const token **\=** jwt.sign({   
  "iss": process.env.ZOOM\_API\_KEY,  
  "exp": 1496091964000  
}, process.env.ZOOM\_SECRET);
```

I prefer passing the Secret key and API key as env variables. You can use any other secure way as well for eg. **Azure Key vault**. Remember to keep your token lifespan as short as possible. This will make the implementation more secure.

Since we have generated the token, we are ready to use it for making API calls. Here are the steps :

1.  **Create users:** Since we are discussing APIs here, so we won’t be taking a conventional route of creating the users from the Zoom Web dashboard. Their dashboard is packed with a lot of features but at a cost of better UX. We will be using the APIs provided by Zoom for **User** resources. You can create various types of users in your zoom account depending on your needs. For some users, you may want them to have access to the Zoom web portal but for others, you may just want them to schedule meetings via your application. We will discuss only those users for which access to the Zoom portal is not available.

> To create such users, we will make a POST API call to [https://api.zoom.us/v2/users](https://api.zoom.us/v2/users) with the following body :

```
{  
 "action": "custCreate",  
 "user\_info": {  
 "email": "james@bond.com",  
 "type": 1,  
 "first\_name": "James",  
 "last\_name": "Bond"  
 }  
}
```

> Follow this detailed article from Zoom for more info: [https://marketplace.zoom.us/docs/api-reference/zoom-api/users/usercreate](https://marketplace.zoom.us/docs/api-reference/zoom-api/users/usercreate).

> We are using a field “action” with the value of “custCreate” in our payload.
> 
> _Users created via this option do not have passwords and will not have the ability to log into the Zoom Web Portal or the Zoom Client. —_ [_Zoom API docs_](https://marketplace.zoom.us/docs/api-reference/zoom-api/users/usercreate)

Here is the code snippet we can use to call this API in Node.js

```
const request = require("request");const options = {  
  method: 'POST',  
  url: 'https://api.zoom.us/v2/users',  
  headers: {'content-type': 'application/json', authorization: \`Bearer ${token}\`},   
  body: {  
   "action": "custCreate",  
   "user\_info": {  
     "email": "james@bond.com",  
     "type": 1,  
     "first\_name": "James",  
     "last\_name": "Bond"  
   }  
},  
  json: true  
};request(options, function (error, response, body) {  
  if (error) throw new Error(error);  
  console.log(body);  
});
```

> N**ote: We are passing the generated token in the “Authorization Header” of the request.**

The response which you get after the success of this API call will have a field “id” that you have to keep handy (better store it in your database) to schedule meetings on behalf of James Bond. Let’s assume the response is this

```
{  
 “id”: “wAdE5hVfRUy3k305kAjBmA”,  
 “first\_name”: “James”,  
 “last\_name”: “Bond”,  
 “email”: “[james@bond.com](mailto:james@bond.com)”,  
 “type”: 1  
}
```

This id will be used as {userId} param while calling Meeting API.

> N**ote: Zoom provides GET API to fetch user related information. Follow the docs.**

2\. **Create meetings:** Since we have both the token and “id” of the user, we can start scheduling the meetings for James Bond.

> For this, we will make a POST API call to [https://api.zoom.us/v2/users/{userId}/meetings.](https://api.zoom.us/v2/users/{userId}/meetings.)

You need to replace {userId} with the id of James Bond which is “wAdE5hVfRUy3k305kAjBmA”. Now the URL becomes

> [https://api.zoom.us/v2/users/wAdE5hVfRUy3k305kAjBmA/meetings.](https://api.zoom.us/v2/users/wAdE5hVfRUy3k305kAjBmA/meetings.)

Send this data in the post request :

```
{  
 "topic": "Demo Meeting 1",  
 "type": 2,  
 "start\_time": "2020-05-05 12:00:00",  
 "password": "Hey123",  
 "agenda": "This is the meeting description",  
 "settings": {  
 "host\_video": false,  
 "participant\_video": false,  
 "join\_before\_host": false,  
 "mute\_upon\_entry": true,  
 "use\_pmi": false,  
 "approval\_type": 0  
 }  
}
```

> Follow this detailed article from Zoom for more info:
> 
> [https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate](https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate).

Here is the code snippet we can use to call this API in Node.js

```
const request = require("request");const options = {  
  method: 'POST',  
  url: 'https://api.zoom.us/v2/users/wAdE5hVfRUy3k305kAjBmA/meetings',  
  headers: {'content-type': 'application/json', authorization: \`Bearer ${token}'},  
  body: {  
    topic: 'Demo Meeting 1',  
    type: 2,  
    start\_time: '2020-05-05 12:00:00',  
    password: 'Hey123',  
    agenda: 'This is the meeting description',  
    settings: {  
      host\_video: false,  
      participant\_video: false,  
      join\_before\_host: false,  
      mute\_upon\_entry: true,  
      use\_pmi: false,  
      approval\_type: 0  
    }  
  },  
  json: true  
};request(options, function (error, response, body) {  
  if (error) throw new Error(error);console.log(body);  
});
```

> N**ote: We are again passing the generated token in the “Authorization Header” of the request.**

Let’s assume the response of this API call is this

```
{  
 “uuid”: “AoHcLp0rRF6i1rjALIK8Pg==”,  
 “id”: 8766521755,  
 “host\_id”: “wAdE5hVfRUy3k305kAjBmQ”,  
 “topic”: “Demo Meeting 1”,  
 “type”: 2,  
 “status”: “waiting”,  
 “start\_time”: “2020-05-05 12:00:00”,  
 “timezone”: “America/Los\_Angeles”,  
 “created\_at”: “2020–05–01T20:23:25Z”,  
 “start\_url”: “https://zoom.us/s/98256521755?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLHZEdxNER1TEFnIiwiY2lkIjoiIn0.\_v772e7BPedl\_P4Gb5wFPx3qKqtVF4bQkUrjnzUeZwE",  
 “join\_url”: “https://zoom.us/j/8766521755",  
 “settings”: {  
      host\_video: false,  
      participant\_video: false,  
      join\_before\_host: false,  
      mute\_upon\_entry: true,  
      use\_pmi: false,  
      approval\_type: 0  
   }  
}
```

Ta-da! We have successfully scheduled a zoom meeting via Zoom APIs for **James Bond**.

> N**ote: Zoom provides GET API to fetch meeting related information. Follow the docs.**

Store this information in your database according to your Database design. I would prefer to use my database for fetching all the meetings scheduled via API rather than calling Zoom APIs each time I want the data because making API calls from your servers to the Zoom servers for various resources will always add latency to your systems. So store the responses received from the API calls in your database for faster access.

That’s all folks! Let me know in case of any issues.

> Zoom API documentation is quite clean and efficient. Follow it here :
> 
> [https://marketplace.zoom.us/docs/api-reference/introduction](https://marketplace.zoom.us/docs/api-reference/introduction)

