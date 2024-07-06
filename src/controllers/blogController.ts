import { Context } from 'hono'
import { BlogModel, BlogPost } from '../models/blogModel'

export const BlogController = {
  getAllPosts: (c: Context) => {
    const posts = BlogModel.getAllPosts();
    return c.json(posts);
  },

  getPostById: (c: Context) => {
    const id = c.req.param('id');
    const post = BlogModel.getPostById(id);
    if (post) {
      return c.json(post);
    }
    return c.json({ error: 'Post not found' }, 404);
  },

  createPost: async (c: Context) => {
    const body = await c.req.json();
    const newPost = BlogModel.createPost(body as Omit<BlogPost, 'id' | 'createdAt'>);
    return c.json(newPost, 201);
  },

  updatePost: async (c: Context) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedPost = BlogModel.updatePost(id, body as Partial<BlogPost>);
    if (updatedPost) {
      return c.json(updatedPost);
    }
    return c.json({ error: 'Post not found' }, 404);
  },

  deletePost: (c: Context) => {
    const id = c.req.param('id');
    const deletedPost = BlogModel.deletePost(id);
    if (deletedPost) {
      return c.json({ message: 'Post deleted successfully' });
    }
    return c.json({ error: 'Post not found' }, 404);
  }
};