const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request,response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
        
})

blogsRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
    
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {

    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
   
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
    response.json(updatedNote)
})

module.exports = blogsRouter