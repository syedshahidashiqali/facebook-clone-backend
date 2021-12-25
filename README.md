# facebook-clone-backend
Social Media REST API with MongoDB and NodeJS.

## API Routes:
### Base URL:
[`https://mern-social-media-api.herokuapp.com/api/v1`](https://mern-social-media-api.herokuapp.com/api/v1)

### `Auth Routes`:

#### 1) Register `(POST)`
##### `/register`

#### 2) Login `(POST)`
##### `/login`

### `Users Routes`:

#### 1) Get a User `(GET)`
##### `/users`

#### 2) Update a User `(PUT)`
##### `/users/:id`

#### 3) Delete a User `(DELETE)`
##### `/users/:id`

#### 4) Follow a User `(PUT)`
##### `/users/:id/follow`

#### 5) Unfollow a User `(PUT)`
##### `/users/:id/unfollow`

#### 6) Get all friends i.e all followings of the user `(GET)`
##### `/users/friends/:userId`

### `Posts Routes`:

#### 1) Create a post `(POST)`
##### `/posts`

#### 2) Get a post `(GET)`
##### `/posts/:id`

#### 3) Update a post `(PUT)`
##### `/posts/:id`

#### 4) Delete a post `(DELETE)`
##### `/posts/:id`

#### 5) Like or Dislike a post `(PUT)`
##### `/posts/:id/like`

#### 6) Get all posts i.e timeline posts `(GET)`
##### `/timeline/:userId`

#### 7) get user's all posts`(GET)`
##### `/profile/:username`

### `Image Upload Routes`:

#### 1) Upload file `(POST)`
##### `/upload`
