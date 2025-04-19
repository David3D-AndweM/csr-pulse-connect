
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Map, Search } from "lucide-react";
import { locationService, RegionWithProjectCount } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newRegion, setNewRegion] = useState({
    name: "",
    country: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data: regions = [], isLoading, refetch } = useQuery({
    queryKey: ["regions"],
    queryFn: () => locationService.getRegions()
  });
  
  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await locationService.createRegion(newRegion);
    if (id) {
      setNewRegion({ name: "", country: "" });
      setDialogOpen(false);
      refetch();
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Locations</h1>
            <p className="text-muted-foreground mt-1">Manage and explore project locations</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search regions..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Region
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Region</DialogTitle>
                  <DialogDescription>
                    Create a new geographic region for project management
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRegion} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Region Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Northern Region" 
                      value={newRegion.name}
                      onChange={(e) => setNewRegion({...newRegion, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      placeholder="e.g., Ghana" 
                      value={newRegion.country}
                      onChange={(e) => setNewRegion({...newRegion, country: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Create Region</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm mb-6 dark:bg-gray-800">
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="bg-csr-light text-csr-primary p-4 rounded-full mb-4 dark:bg-csr-primary/20">
              <Map className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-medium mb-2">Interactive Map</h2>
            <p className="text-center max-w-md mb-6 text-muted-foreground">
              This section will feature an interactive map showing all project locations with filters for region, project type, and status.
            </p>
            <div className="border border-dashed w-full max-w-3xl h-96 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Interactive Map Will Appear Here</p>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : (
          filteredRegions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRegions.map((region) => (
                <Card key={region.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{region.name}</CardTitle>
                      <span className="bg-csr-light text-csr-primary text-xs font-medium px-2 py-1 rounded">
                        {region.projectCount} Projects
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{region.country}</p>
                    <div className="flex justify-end">
                      <Button variant="link" className="text-csr-primary p-0 h-auto font-medium">
                        View Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed rounded-lg">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Regions Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 
                  "No regions match your search criteria. Try a different search term." : 
                  "No regions have been defined yet. Get started by adding your first region."
                }
              </p>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
