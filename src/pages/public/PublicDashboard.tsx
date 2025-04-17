
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ChevronDown, Download, BarChart3, PieChart, Globe, Users, ArrowUpRight } from "lucide-react";
import {
  Tabs, TabsList, TabsTrigger, TabsContent
} from "@/components/ui/tabs";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartPieChart, Pie, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function PublicDashboard() {
  const [filterYear, setFilterYear] = useState<string>("2025");
  const [filterRegion, setFilterRegion] = useState<string>("All Regions");
  
  // Sample data for charts
  const categoryData = [
    { name: "Education", value: 25 },
    { name: "Healthcare", value: 30 },
    { name: "Environment", value: 15 },
    { name: "Infrastructure", value: 20 },
    { name: "Agriculture", value: 10 }
  ];

  const regionData = [
    { name: "Northern", value: 15 },
    { name: "Southern", value: 25 },
    { name: "Eastern", value: 18 },
    { name: "Western", value: 22 },
    { name: "Central", value: 20 }
  ];

  const progressData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 25 },
    { name: "Apr", value: 30 },
    { name: "May", value: 40 },
    { name: "Jun", value: 45 },
    { name: "Jul", value: 55 },
    { name: "Aug", value: 65 },
    { name: "Sep", value: 70 },
    { name: "Oct", value: 80 },
    { name: "Nov", value: 85 },
    { name: "Dec", value: 95 }
  ];

  const impactData = [
    { name: "People Reached", completed: 10500, target: 15000 },
    { name: "Trees Planted", completed: 8500, target: 10000 },
    { name: "Schools Built", completed: 25, target: 30 },
    { name: "Water Sources", completed: 45, target: 50 }
  ];
  
  const COLORS = ["#9b87f5", "#7E69AB", "#6E59A5", "#D6BCFA", "#0ea5e9"];

  const impactCards = [
    { title: "People Impacted", value: "125K+", change: "+12%", icon: Users, color: "bg-purple-500" },
    { title: "Projects Completed", value: "84", change: "+8%", icon: BarChart3, color: "bg-indigo-500" },
    { title: "Communities Served", value: "47", change: "+5%", icon: Globe, color: "bg-blue-500" },
    { title: "Success Rate", value: "94%", change: "+2%", icon: PieChart, color: "bg-green-500" },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex justify-between items-center mb-16">
            <Link to="/" className="text-2xl font-bold">Clareo</Link>
            <div className="space-x-4">
              <Link to="/public/dashboard" className="hover:underline">Impact Dashboard</Link>
              <Link to="/public/blog" className="hover:underline">Blog</Link>
              <Link to="/login" className="px-4 py-2 bg-white text-purple-600 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Sign In
              </Link>
            </div>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">Transparent Impact Measurement & Reporting</h1>
              <p className="text-xl opacity-90 mb-8">
                Explore our community development metrics and see the real impact of our projects across Zambia.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-white text-purple-700 hover:bg-gray-100">
                  Explore Projects
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700">
                  Download Report <Download size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://source.unsplash.com/random/800x600/?data-visualization" 
                alt="Data visualization" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </header>
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Impact Cards */}
          <h2 className="text-3xl font-bold mb-8">Impact Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impactCards.map((card, idx) => (
              <Card key={idx} className="border-none shadow-md overflow-hidden">
                <div className={`h-2 w-full ${card.color}`}></div>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center text-gray-600">
                    <card.icon className="mr-2 h-5 w-5" /> {card.title}
                  </CardDescription>
                  <div className="flex justify-between items-end">
                    <CardTitle className="text-3xl font-bold">{card.value}</CardTitle>
                    <span className="text-sm flex items-center font-medium text-green-600">
                      {card.change} <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-2 md:mb-0">Detailed Metrics</h2>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {filterYear}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterYear("2023")}>2023</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterYear("2024")}>2024</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterYear("2025")}>2025</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    {filterRegion}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterRegion("All Regions")}>All Regions</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRegion("Northern")}>Northern</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRegion("Southern")}>Southern</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRegion("Eastern")}>Eastern</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRegion("Western")}>Western</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRegion("Central")}>Central</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Projects by Category</CardTitle>
                <CardDescription>Distribution of projects across different categories</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </RechartPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Projects across different regions</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Projects" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Project Completion Progress</CardTitle>
                <CardDescription>Monthly progress throughout {filterYear}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Completion %" 
                      stroke="#10b981" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Impact Achievements</CardTitle>
                <CardDescription>Current achievements vs targets</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={impactData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#9b87f5" />
                    <Bar dataKey="target" name="Target" fill="#D6BCFA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Success Stories */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Success Stories</h2>
              <Link to="/public/blog" className="text-violet-600 hover:text-violet-800 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3].map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={`https://source.unsplash.com/random/800x600/?africa,community,${index}`}
                            alt="Success story"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>Community Transformation</CardTitle>
                          <CardDescription>How our water project changed lives in rural Zambia</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-3 text-gray-600">
                            Through strategic partnerships and sustainable solutions, we helped bring clean water to over 500 families, drastically reducing waterborne illnesses and improving quality of life.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join our mission to create sustainable change in Zambian communities through impactful CSR initiatives.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-purple-700 hover:bg-gray-100">
                Partner With Us
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700">
                Learn More
              </Button>
            </div>
          </div>
        </div>
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
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-l-md px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
                />
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
