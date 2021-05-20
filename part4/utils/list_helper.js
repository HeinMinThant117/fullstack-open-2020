const { maxBy } = require('lodash')
const lodash = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(function (sum, blog) {
        return sum + blog.likes
    }, 0)
}


const favoriteBlog = (blogs) => {
    const index = blogs.reduce(function (sum, blog, index) {
        if (blog.likes > blogs[sum].likes) {
            sum = index
        }
        return sum
    }, 0)

    return blogs[index]
}

const mostBlogs = (blogs) => {
    const authors = lodash.countBy(blogs, function (blog) {
        return blog.author
    })



    let author = lodash.max(Object.keys(authors), a => authors[a])

    return {
        author: author,
        blogs: authors[author]
    }
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, b => b.author)
    const authorLikes = []

    Object.keys(authors).forEach(author => {
        const likes = authors[author].reduce((sum, blog) => {

            return sum += blog.likes
        }, 0)
        authorLikes.push({
            author: author,
            likes: likes
        })
    })

    return maxBy(authorLikes, o => o.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}