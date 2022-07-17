# Overview

APIs Yemusic...

## User API

### SignIn

- Route: `api/user/signin`
- Method: `POST`
- Input
  - `Body`

  ```ts
   {
    email: string,
    password: string,
    displayName: string,
   }
  ```

- Responses

  ```ts
    {
      data: {
        me: {
          _id: string,
          email: string,
          info: {
            displayName: string,
          },
          isValidEmail: boolean,
          isBlocked: boolean,
          createdAt: string,
          updatedAt: string,
        }
        accessToken: string
      }
    }
  ```

- Issues: #22

### SignUp

- Route: `api/user/signup`
- Method: `POST`
- Input
  - `Body`

  ```ts
  {
    account: string,
    password: string
  }
    ```

- Responses

  ```ts
    {
      data: {
        me: {
          _id: string,
          email: string,
          info: {
            displayName: string,
          },
          isValidEmail: boolean,
          isBlocked: boolean,
          createdAt: string,
          updatedAt: string,
        }
        accessToken: string
      }
    }
  ```

- Issues: #21

## Youtube API

### Get List

- Route: `api/us/song/s`
- Method: `POST`
- Input
  - `Body`
  
  ```ts
  {
    search: string,
    apiKey?: string,
    token?: string,
  }
  ```

- Responses
  
  ```ts
    {
      data: {
        songs: [{
          yId: string,
          thumbnail: {
            url: string,
            width: number,
            height: number,
          },
          duration: string,
          title: string,
          channel: string,
          view: string,
          publishedAt: string,
        }],
        token: string,
        apiKey: string,
      }
    }
  ```

- Issues: #17

### Get Trending

- Route: `api/song/trending`
- Method: `POST`
- Responses
  
  ```ts
    {
      data: {
        songs: [{
          yId: string,
          thumbnail: {
            url: string,
            width: number,
            height: number,
          },
          duration: string,
          title: string,
          channel: string,
          view: string,
          publishedAt: string,
        }]
      }
    }
  ```

- Issues: #31

### Get Audio

- Route: `api/song/:yId`
- Method: `GET`
- Responses

  ```ts
  {
    data: {
      audioUrl: string
    }
  }
  ```

- Issues: #17
