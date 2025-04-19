
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestService } from "@/services/request.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Request } from "@/types";

const requestSchema = z.object({
  type: z.enum(["Facility", "Support"]),
  facility: z.string().min(3, "Facility/Support name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type RequestFormValues = z.infer<typeof requestSchema>;

export default function CreateRequest() {
  const navigate = useNavigate();
  
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      type: "Facility",
      facility: "",
      description: "",
    },
  });

  const onSubmit = async (values: RequestFormValues) => {
    try {
      const requestData = {
        type: values.type,
        facility: values.facility,
        description: values.description,
        status: "pending" as const, // Use const assertion to fix type issue
      };

      const requestId = await requestService.createRequest(requestData);
      
      if (requestId) {
        toast.success("Request submitted successfully");
        navigate("/requests");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request");
    }
  };

  return (
    <Layout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/requests">Requests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>New Request</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Submit New Request</h1>
        <p className="text-muted-foreground mt-1">
          Request facility usage or support for your CSR activities
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Request Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Facility">Facility Usage</SelectItem>
                      <SelectItem value="Support">Support Request</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Facility/Support Name */}
            <FormField
              control={form.control}
              name="facility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("type") === "Facility" ? "Facility Name" : "Support Type"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={
                        form.watch("type") === "Facility" 
                        ? "e.g. Conference Room A, Training Hall" 
                        : "e.g. Technical Support, Financial Aid"
                      } 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={5} 
                      placeholder="Please provide details about your request..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/requests")}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
