import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecipeGrid from '../components/features/RecipeGrid';
import { Button, Badge, Modal, Input } from '../components/ui';
import { 
  UserIcon, 
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('recipes');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Check if viewing own profile (in real app, get from auth context)
  const isOwnProfile = !username || username === 'current-user';

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Sarah Johnson',
    username: 'sarahjohnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    bio: 'Passionate home cook and food blogger. Love experimenting with international cuisines and sharing family recipes.',
    location: 'San Francisco, CA',
    joinedDate: '2023-01-15',
    stats: {
      recipes: 24,
      followers: 1247,
      following: 156,
      likes: 3456
    },
    social: {
      website: 'https://sarahcooks.com',
      instagram: '@sarahcooks',
      twitter: '@sarahcooks'
    }
  };

  const mockUserRecipes = [
    {
      id: 1,
      title: 'Homemade Sourdough Bread',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
      rating: 4.8,
      category: 'Baking',
      prepTime: '4 hours',
      author: { name: 'Sarah Johnson' }
    },
    {
      id: 2,
      title: 'Thai Green Curry',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
      rating: 4.6,
      category: 'Asian',
      prepTime: '45 min',
      author: { name: 'Sarah Johnson' }
    }
  ];

  const tabs = [
    { id: 'recipes', label: 'My Recipes', count: mockUser.stats.recipes },
    { id: 'favorites', label: 'Favorites', count: 12 },
    { id: 'reviews', label: 'Reviews', count: 89 }
  ];

  useEffect(() => {
    // Simulate API calls
    const fetchUserData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(mockUser);
        setUserRecipes(mockUserRecipes);
        setFavoriteRecipes(mockUserRecipes.slice(0, 1)); // Mock favorites
        setEditForm({
          name: mockUser.name,
          bio: mockUser.bio,
          location: mockUser.location,
          website: mockUser.social.website
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update user data
    setUser(prev => ({
      ...prev,
      ...editForm,
      social: {
        ...prev.social,
        website: editForm.website
      }
    }));
    setShowEditModal(false);
  };

  const handleFollow = () => {
    // Implement follow/unfollow logic
    console.log('Toggle follow');
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <p className="text-gray-600">@{user.username}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {user.location && (
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                {isOwnProfile ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditModal(true)}
                    >
                      <CogIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Recipe
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleFollow}>
                      <UserIcon className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                    <Button>Message</Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-6 max-w-2xl">
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="flex space-x-8 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.stats.recipes}
                </div>
                <div className="text-sm text-gray-600">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.stats.followers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.stats.following}
                </div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.stats.likes.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                  <Badge variant="default" size="sm" className="ml-2">
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'recipes' && (
              <RecipeGrid recipes={userRecipes} columns={3} />
            )}

            {activeTab === 'favorites' && (
              <RecipeGrid recipes={favoriteRecipes} columns={3} />
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Reviews coming soon
                </h3>
                <p className="text-gray-600">
                  This feature will be available in the next update.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Profile"
          size="md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              label="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>

            <Input
              label="Location"
              value={editForm.location}
              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              placeholder="City, Country"
            />

            <Input
              label="Website"
              value={editForm.website}
              onChange={(e) => setEditForm({...editForm, website: e.target.value})}
              placeholder="https://your-website.com"
            />

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Profile;