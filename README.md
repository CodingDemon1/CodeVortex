# CodeVortex

Code Vortex is an innovative self-interview prep platform harnessing the power of AI and natural language processing. It leverages OpenAI's advanced capabilities and prompt engineering techniques to replicate real interview scenarios. With personalized feedback and a comprehensive set of resources, Code Vortex empowers users to enhance their interview skills and excel in their job search.


## Deployed Links

[https://frontend-url/](https://frontend-url/)  **(Netlify)** \
[https://backend-url/](https://backend-url/) **(Railway)** 


## Features

- AI-Powered Interview Simulation
- Personalized Feedback
- Prompt Engineering Techniques
- Performance Tracking and Analytics


## Tech Stack

**Client:** React, Redux, TailwindCSS, Thunk, Chakra UI

**Server:** Node, Express, MongoDB


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


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