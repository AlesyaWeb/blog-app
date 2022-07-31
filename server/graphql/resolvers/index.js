// import { authorQueries, authorMutations } from './author';
// import { bookQueries, bookMutations } from './book';
// import { publisherQueries, publisherMutations } from './publisher';
const userQueries = require('./user/queries')
const userMutations = require('./user/mutations')
const commentQueries = require('./comment/queries')
const commentMutations = require('./comment/mutations')
const likeQueries = require('./like/queries')
const likeMutations = require('./like/mutations')
const postQueries = require('./post/queries')
const postMutations = require('./post/mutations')
const sliderImageMutations = require('./sliderImage/mutations')
const sliderImageQueries = require('./sliderImage/queries')
const authorInfoMutations = require('./authorInfo/mutations')
const authorInfoQueries = require('./authorInfo/queries')
const authorContactsQueries = require('./authorContacts/queries')
const authorContactsMutations = require('./authorContacts/mutations')
const postFields = require('./post/fields')
console.log(userQueries)

const resolvers = {
    Query: {
        ...userQueries,
        ...commentQueries,
        ...likeQueries,
        ...postQueries,
        ...sliderImageQueries,
        ...authorInfoQueries,
        ...authorContactsQueries
    },
    Mutation: {
        ...userMutations,
        ...commentMutations,
        ...likeMutations,
        ...postMutations,
        ...sliderImageMutations,
        ...authorInfoMutations,
        ...authorContactsMutations
    },
    ...postFields
};
module.exports = resolvers