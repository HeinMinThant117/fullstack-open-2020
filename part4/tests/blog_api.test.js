const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog unique identifier is id', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('succesfully creating a blog post', async() => {

    const newBlog = {
        title: 'Poggers',
        author: 'Johnny',
        url: 'johnny.com',
        likes: 213213
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    delete response.body.id
    
    expect(response.body).toMatchObject(newBlog)

    const blogs = await api
        .get('/api/blogs')
        .expect(200)
    
    expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)
    
})

test('like becomes 0 if not specified', async() => {

    const newBlog = {
        title: 'Jerry',
        author: 'Mongo',
        url: 'mongo.com',
    }

    const savedNote = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(savedNote.body.likes).toBe(0)
    
})

test('produce a 400 Bad request when there is no url and title properties', async() => {

    const newBlog = {
        author: 'Michael'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be updated', async() => {

    const blog = {
        title: 'Jimmy',
        author: 'Jimmy Changas',
        url: 'www.jimmy.com',
        likes: 1234
    }

    const id = '60bc6325faff88617e5bc83a'

    const updatedNote =  api
        .put(`/api/blogs/${id}`)
        .send(blog)
        .expect(200)

    expect(updatedNote.body).toBe(0)

    // const updatedBlog = await Blog.findByIdAndUpdate('60bc6325faff88617e5bc83a', blog, {new : true})
})

afterAll(() => {
    mongoose.connection.close()
})