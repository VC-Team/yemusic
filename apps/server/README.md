# Overview

APIs Yemusic...

## User API

### SignIn

- Route: `api/user/sign-in`
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

- Route: `api/user/sign-up`
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

### Refresh Token

- Route: `api/user/refresh-token`
- Method: `POST`
- Input
  - `req.cookies`

  ```ts
  {
    refreshToken: string,
  }
    ```

- Responses

  ```ts
  {
    data: {
      accessToken: String
    }
  }
  ```

## Send Email Verify

- Route: `api/user/send-email-verify`
- Method: `POST`
- Input
  - `Body`

  ```ts
  {
    email: string,
  }
  ```

## Verify Email

- Route: `api/user/verify-email/:tokenVerifyEmail`
- Method: `GET`
- Input
  - `Params`

  ```ts
  {
    tokenVerifyEmail: string,
  }
  ```

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
