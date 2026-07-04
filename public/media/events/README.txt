EVENT PHOTOS
============

Drop photos for each event into a folder named after its slug in
src/data/events.ts, then list them in that entry's `media` field.

  public/media/events/
    finhack-2026/
      cover.jpg          <- shows on the card (16:9 works best)
      photo-01.jpg       <- extra gallery shots
    myai-future-hackathon/
      cover.jpg
    cis-deans-list-jan-2024/
      cover.jpg
    linkedin-workshop-harmoni/
      cover.jpg
    ndtc-um/
      cover.jpg

Then in src/data/events.ts set e.g.:

  media: {
    cover: '/media/events/finhack-2026/cover.jpg',
    gallery: ['/media/events/finhack-2026/photo-01.jpg'],
  },

Cards render a styled placeholder automatically until a cover exists.
