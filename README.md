# CodeVortex

Code Vortex is an innovative self-interview prep platform harnessing the power of AI and natural language processing. It leverages OpenAI's advanced capabilities and prompt engineering techniques to replicate real interview scenarios. With personalized feedback and a comprehensive set of resources, Code Vortex empowers users to enhance their interview skills and excel in their job search.


## Deployed Links
https://code-vertex.netlify.app  **(Netlify)** \
https://tiny-pear-jaguar-veil.cyclic.app **(Cyclic)** 


## Features

- AI-Powered Interview Simulation
- Personalized Feedback
- Prompt Engineering Techniques
- Performance Tracking and Analytics


## Tech Stack

**Client:** React, Redux, TailwindCSS, Thunk, Chakra UI

**Server:** Node, Express, MongoDB


## Screenshots

![CodeVertexSignup](https://github.com/CodingDemon1/CodeVortex/assets/68629598/e0217d76-477e-4213-aa9a-292548fbb996)
![CodeVertexLogin](https://github.com/CodingDemon1/CodeVortex/assets/68629598/2f569e53-698a-4007-a7d7-26129880cacc)
![CodeVertexForgotPass](https://github.com/CodingDemon1/CodeVortex/assets/68629598/28e9e2c1-f8f6-4fa9-89fb-5b4758a14717)
![CodeVortexHome](https://github.com/CodingDemon1/CodeVortex/assets/68629598/654458dc-2521-42f1-8386-28418a55536a)
![CodeVortexInterview](https://github.com/CodingDemon1/CodeVortex/assets/68629598/789e8dfb-9192-4192-8493-5cd1420f7523)
![CodeVortexFeedbackGenerationPage](https://github.com/CodingDemon1/CodeVortex/assets/68629598/d107e72a-6025-45d3-963f-48a4194bc8c2)
![CodeVortexFeedbackpage](https://github.com/CodingDemon1/CodeVortex/assets/68629598/cefe03a9-adb9-41ba-aede-0278479f96a3)
![CodeVortexScoresPage](https://github.com/CodingDemon1/CodeVortex/assets/68629598/e5be4b54-243d-470b-8cc1-c3875cc93ac3)




## Authors

- [@abhimanyulp](https://github.com/abhimanyulp)
- [@GRAviTY-GAGAN](https://github.com/GRAviTY-GAGAN)
- [@vipullsingh](https://github.com/vipullsingh)
- [@Sonu-Shettiyar](https://github.com/Sonu-Shettiyar)
- [@CodingDemon1](https://github.com/CodingDemon1)
- [@senapathisowjanya](https://github.com/senapathisowjanya)


## API Reference

#### User Registration

```http
  POST /user/register
```

#### User Login

```http
  POST /user/login
```

#### User Logout

```http
  GET /user/logout
```

#### Verify User

```http
  GET /user/verify
```

| Header    | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Required**. Token of the user   |

#### Get Questions

```http
  POST /question/query
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `role, experience`   | `object` | **Required**.          |

#### Get Feedback of Questions

```http
  POST /question/rating
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid, question1, question2, answer1, answer3`   | `object` | **Required**.    |

#### Get History of User

```http
  GET /history/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


