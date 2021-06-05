const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hello',
        author: 'Jimmy',
        url: 'Dimsum.com',
        likes: 123123123,
    },
    {
        title: 'GoodBye',
        author: 'Jerry',
        url: 'Sushi.com',
        likes: 58298492
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}