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