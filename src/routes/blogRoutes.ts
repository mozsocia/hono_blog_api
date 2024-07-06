// routes/blogRoutes.ts
import { Hono } from 'hono'
import { BlogController } from '../controllers/blogController'

const blogRoutes = new Hono()

blogRoutes.get('/', BlogController.getAllPosts)
blogRoutes.get('/:id', BlogController.getPostById)
blogRoutes.post('/', BlogController.createPost)
blogRoutes.put('/:id', BlogController.updatePost)
blogRoutes.delete('/:id', BlogController.deletePost)

export default blogRoutes