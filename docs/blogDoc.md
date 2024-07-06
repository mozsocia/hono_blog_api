# blog Documentation

## Model

```typescript
// src/models/blogModel.ts
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
  }
  
  // This is a simple in-memory store. In a real application, you'd use a database.
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Blog post 1',
      content: 'This is my first blog post',
      author: 'John Doe',
      createdAt: new Date(Date.UTC(2022, 11, 1)),
    },
    {
      id: '2',
      title: 'Blog post 2',
      content: 'This is my second blog post',
      author: 'Jane Doe',
      createdAt: new Date(Date.UTC(2022, 11, 2)),
    },
    {
      id: '3',
      title: 'Blog post 3',
      content: 'This is my third blog post',
      author: 'Jane Doe',
      createdAt: new Date(Date.UTC(2022, 11, 3)),
    },
  ];
  
  export const BlogModel = {
    getAllPosts: () => blogPosts,
    getPostById: (id: string) => blogPosts.find(post => post.id === id),
    createPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      blogPosts.push(newPost);
      return newPost;
    },
    updatePost: (id: string, updatedPost: Partial<BlogPost>) => {
      const index = blogPosts.findIndex(post => post.id === id);
      if (index !== -1) {
        blogPosts[index] = { ...blogPosts[index], ...updatedPost };
        return blogPosts[index];
      }
      return null;
    },
    deletePost: (id: string) => {
      const index = blogPosts.findIndex(post => post.id === id);
      if (index !== -1) {
        return blogPosts.splice(index, 1)[0];
      }
      return null;
    }
  };
```

## Routes

```typescript
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
```

## Controller

```typescript
// src/controllers/blogController.ts
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
```

