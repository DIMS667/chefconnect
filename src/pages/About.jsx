import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Chefs', value: '500+' },
    { label: 'Recipes Shared', value: '1,000+' },
    { label: 'Community Members', value: '50,000+' },
    { label: 'Countries', value: '25+' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Former Michelin-starred chef turned entrepreneur, passionate about connecting culinary talents worldwide.'
    },
    {
      name: 'Marco Rodriguez',
      role: 'Head Chef',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Expert in international cuisines with 20+ years of experience in top restaurants around the globe.'
    },
    {
      name: 'Emma Chen',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Food blogger and social media expert, dedicated to fostering our vibrant cooking community.'
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                About ChefConnect
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're building the world's largest community of passionate cooks and professional chefs, 
                where culinary knowledge is shared, celebrated, and preserved for future generations.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At ChefConnect, we believe that food is the universal language that brings people together. 
                  Our mission is to create a platform where culinary enthusiasts from all backgrounds can 
                  share their passion, learn from each other, and discover new flavors from around the world.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're a home cook looking to expand your repertoire or a professional chef 
                  wanting to share your expertise, ChefConnect provides the tools and community to help 
                  you grow and inspire others.
                </p>
                <Link to="/register">
                  <Button size="lg">
                    Join Our Community
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                  alt="Chefs cooking together"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Growing Community
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of culinary enthusiasts sharing their passion for cooking
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Community First
                </h3>
                <p className="text-gray-600">
                  We prioritize building meaningful connections and fostering a supportive environment 
                  where everyone feels welcome to share and learn.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality Content
                </h3>
                <p className="text-gray-600">
                  We're committed to maintaining high standards for recipes and content, ensuring 
                  our community has access to reliable and well-tested culinary knowledge.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Global Diversity
                </h3>
                <p className="text-gray-600">
                  We celebrate culinary traditions from all cultures and encourage the sharing 
                  of diverse recipes and cooking techniques from around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The passionate people behind ChefConnect
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Share Your Culinary Journey?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join ChefConnect today and become part of a community that celebrates the art of cooking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/recipes">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-orange-600">
                  Browse Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;