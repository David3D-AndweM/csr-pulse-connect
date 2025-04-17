
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "@/components/content/ContentBlogManager";
import { mockBlogPosts } from "@/data/contentMockData";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <nav className="flex justify-between items-center mb-12">
            <Link to="/" className="text-2xl font-bold">Clareo</Link>
            <div className="space-x-4">
              <Link to="/public/dashboard" className="hover:underline">Impact Dashboard</Link>
              <Link to="/public/blog" className="hover:underline">Blog</Link>
              <Link to="/login" className="px-4 py-2 bg-white text-purple-600 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Sign In
              </Link>
            </div>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Insights & Stories</h1>
            <p className="text-xl opacity-90 mb-8">
              Learn about our initiatives, success stories, and the impact we're making in Zambian communities.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 py-6 bg-white bg-opacity-20 text-white placeholder:text-white placeholder:text-opacity-70 border-none rounded-lg focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={!activeCategory ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Featured Article */}
        {filteredPosts[0] && (
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-wider text-violet-600 font-semibold mb-4">Featured Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 overflow-hidden rounded-xl">
                <img 
                  src={filteredPosts[0].imageUrl} 
                  alt={filteredPosts[0].title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar size={16} className="mr-1" />
                  {new Date(filteredPosts[0].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </div>
                <h1 className="text-4xl font-bold mb-4">{filteredPosts[0].title}</h1>
                <p className="text-lg text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center">
                  <Button className="group">
                    Read More 
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Articles Grid */}
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.slice(1).map(post => (
            <div key={post.id} className="group">
              <div className="overflow-hidden rounded-xl mb-4">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="bg-violet-100 text-violet-800 rounded-full px-2 py-1 text-xs mr-2">
                  {post.category}
                </span>
                <Calendar size={14} className="mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-600 transition-colors">{post.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
              <Button variant="link" className="p-0 flex items-center group">
                Read More
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination className="my-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Clareo</h3>
              <p className="text-gray-600">Empowering Zambian communities through strategic impact management.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-violet-600">About Us</a></li>
                <li><a href="#" className="hover:text-violet-600">Our Projects</a></li>
                <li><a href="#" className="hover:text-violet-600">Impact Dashboard</a></li>
                <li><a href="#" className="hover:text-violet-600">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-violet-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-violet-600">Partner With Us</a></li>
                <li><a href="#" className="hover:text-violet-600">Volunteer</a></li>
                <li><a href="#" className="hover:text-violet-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Subscribe</h3>
              <p className="text-gray-600 mb-4">Stay updated with our newsletter</p>
              <div className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Clareo Non Profit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
