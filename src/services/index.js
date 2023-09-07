import { databank } from './databank/databank.js'

import { publicServices } from './public-services/public-services.js'

import { legals } from './legals/legals.js'

import { achievements } from './achievements/achievements.js'

import { programs } from './programs/programs.js'

import { personnel } from './personnel/personnel.js'

import { events } from './events/events.js'

import { announcements } from './announcements/announcements.js'

import { gallery } from './gallery/gallery.js'

import { uploads } from './uploads/uploads.js'

import { news } from './news/news.js'

import { categories } from './categories/categories.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(databank)

  app.configure(publicServices)

  app.configure(legals)

  app.configure(achievements)

  app.configure(programs)

  app.configure(personnel)

  app.configure(events)

  app.configure(announcements)

  app.configure(gallery)

  app.configure(uploads)

  app.configure(news)

  app.configure(categories)

  app.configure(user)

  // All services will be registered here
}
