### Setup

#### Install dependencies

`$ npm i`

#### To run the server on localhost:6001

`$ npm run start`

#### Recordings:

stored in `/recordings`. `png` for thumbs, `webv` for video, `json` for metadata.

#### Routes:

`/videos/:id`

serves a .webv video

`/videos`

returns a list of the current recordings

`/thumbs/:id`

serves a thumbnail

`/upload`

websocket upgrade route handlers in `handlers/uploads.js`

##### To do:

- Implement frame stitching with `fluent-ffmpeg` for ios.
- Add proper database for metadata
- Add video stitching to stich clips from the the same session together
