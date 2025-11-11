import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, Badge, Button } from '../components/ui';
import { CalendarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock blog posts
  const mockPosts = [
    {
      id: 1,
      title: '10 Essential Knife Skills Every Home Cook Should Master',
      excerpt: 'Learn the fundamental cutting techniques that will transform your cooking and make meal prep faster and safer.',
      image: 'https://images.unsplash.com/photo-1541013892452-956e12c7c20c?w=600',
      author: 'Chef Marco Rodriguez',
      publishedDate: '2024-01-15',
      readTime: '8 min read',
      category: 'Techniques',
      featured: true
    },
    {
      id: 2,
      title: 'The Science Behind Perfect Pasta: Al Dente Explained',
      excerpt: 'Discover the chemistry and techniques behind cooking pasta to the perfect texture every time.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600',
      author: 'Sarah Johnson',
      publishedDate: '2024-01-10',
      readTime: '6 min read',
      category: 'Science',
      featured: false
    },
    {
      id: 3,
      title: 'Seasonal Cooking: Making the Most of Winter Vegetables',
      excerpt: 'Explore creative ways to use winter vegetables in hearty, warming dishes that celebrate the season.',
      image: 'https://images.unsplash.com/photo-1596097709441-6b629e2a7b3e?w=600',
      author: 'Emma Chen',
      publishedDate: '2024-01-08',
      readTime: '5 min read',
      category: 'Seasonal',
      featured: false
    },
    {
      id: 4,
      title: 'Building Your Spice Collection: A Beginner\'s Guide',
      excerpt: 'Start your spice journey with our comprehensive guide to essential spices and how to use them.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600',
      author: 'David Kim',
      publishedDate: '2024-01-05',
      readTime: '7 min read',
      category: 'Basics',
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ChefConnect Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover cooking tips, techniques, and culinary insights from our community of chefs and food enthusiasts.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="primary">{featuredPost.category}</Badge>
                      <span className="text-sm text-gray-500">Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <UserIcon className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(featuredPost.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      <Link to={`/blog/${featuredPost.id}`}>
                        <Button>Read More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} hover className="overflow-hidden">
                  <Link to={`/blog/${post.id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="default" size="sm">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {post.author}</span>
                        <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-orange-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss new recipes, cooking tips, and culinary insights from our community.
            </p>
            <div className="max-w-md mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;