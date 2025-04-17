
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { mockBlogPosts } from "@/data/contentMockData";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

export function ContentBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateNewPost = () => {
    setCurrentPost({
      id: `post-${Date.now()}`,
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "https://source.unsplash.com/random/800x600/?technology",
      author: "Admin",
      date: new Date().toISOString(),
      category: "General",
      tags: [],
    });
    setOpenDialog(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setOpenDialog(true);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.success("Blog post deleted");
  };

  const handleSavePost = () => {
    if (!currentPost) return;
    
    if (currentPost.title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    if (posts.some(post => post.id === currentPost.id)) {
      setPosts(posts.map(post => post.id === currentPost.id ? currentPost : post));
      toast.success("Blog post updated");
    } else {
      setPosts([...posts, currentPost]);
      toast.success("New blog post created");
    }
    setOpenDialog(false);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Button onClick={handleCreateNewPost}>
          <Plus size={16} className="mr-2" />
          New Post
        </Button>
      </div>

      <div className="flex space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" /> 
          Filter
        </Button>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                <CardDescription>{new Date(post.date).toLocaleDateString()} | {post.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash size={14} className="mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{currentPost?.id.startsWith('post-') ? 'Create New Post' : 'Edit Post'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your blog post. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentPost?.title || ''}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, title: e.target.value} : null)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={currentPost?.excerpt || ''}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, excerpt: e.target.value} : null)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={currentPost?.category || ''}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, category: e.target.value} : null)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={8}
                value={currentPost?.content || ''}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, content: e.target.value} : null)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePost}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
