
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
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus, Search, Star } from "lucide-react";
import { toast } from "sonner";
import { mockTestimonials } from "@/data/contentMockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  imageUrl?: string;
  location: string;
  projectId?: string;
}

export function ContentTestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateNew = () => {
    setCurrentTestimonial({
      id: `testimonial-${Date.now()}`,
      name: "",
      role: "",
      organization: "",
      content: "",
      rating: 5,
      location: "",
    });
    setOpenDialog(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(item => item.id !== id));
    toast.success("Testimonial deleted");
  };

  const handleSave = () => {
    if (!currentTestimonial) return;
    
    if (currentTestimonial.name.trim() === "" || currentTestimonial.content.trim() === "") {
      toast.error("Name and content are required");
      return;
    }

    if (testimonials.some(item => item.id === currentTestimonial.id)) {
      setTestimonials(testimonials.map(item => item.id === currentTestimonial.id ? currentTestimonial : item));
      toast.success("Testimonial updated");
    } else {
      setTestimonials([...testimonials, currentTestimonial]);
      toast.success("New testimonial created");
    }
    setOpenDialog(false);
  };

  const filteredTestimonials = testimonials.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Button onClick={handleCreateNew}>
          <Plus size={16} className="mr-2" />
          New Testimonial
        </Button>
      </div>

      <div className="flex mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search testimonials..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.imageUrl} />
                    <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.organization}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex mb-2">
                  {getRatingStars(testimonial.rating)}
                </div>
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                <p className="text-xs text-muted-foreground mt-2">{testimonial.location}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(testimonial.id)}>
                  <Trash size={14} className="mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground">No testimonials found.</p>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentTestimonial?.id.startsWith('testimonial-') ? 'Create New Testimonial' : 'Edit Testimonial'}</DialogTitle>
            <DialogDescription>
              Add details for this testimonial. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentTestimonial?.name || ''}
                  onChange={(e) => setCurrentTestimonial(prev => prev ? {...prev, name: e.target.value} : null)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={currentTestimonial?.role || ''}
                  onChange={(e) => setCurrentTestimonial(prev => prev ? {...prev, role: e.target.value} : null)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={currentTestimonial?.organization || ''}
                  onChange={(e) => setCurrentTestimonial(prev => prev ? {...prev, organization: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={currentTestimonial?.location || ''}
                  onChange={(e) => setCurrentTestimonial(prev => prev ? {...prev, location: e.target.value} : null)}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={currentTestimonial?.rating || 5}
                onChange={(e) => setCurrentTestimonial(prev => prev ? 
                  {...prev, rating: Math.max(1, Math.min(5, parseInt(e.target.value)))} : null)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Testimonial</Label>
              <Textarea
                id="content"
                rows={5}
                value={currentTestimonial?.content || ''}
                onChange={(e) => setCurrentTestimonial(prev => prev ? {...prev, content: e.target.value} : null)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
