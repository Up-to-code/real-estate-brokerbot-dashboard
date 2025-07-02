"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ClientSelection } from "@/components/pages/campaigns/client-selection";
import {
  CreateCampaignInput,
  CampaignType,
  CampaignStatus,
} from "@/types/campaign";

interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  language: string;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  const [formData, setFormData] = useState<CreateCampaignInput>({
    name: "",
    type: "Template",
    status: "Draft",
    audience: "all",
    message: "",
    templateId: "",
    clientIds: [],
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/templates`
        );
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data = await response.json();
        setTemplates(data || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast({
          title: "Error",
          description: "Failed to load templates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, [toast]);

  const handleChange = (field: keyof CreateCampaignInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "type" && value === "Custom" && { templateId: "" }),
      ...(field === "type" && value === "Template" && { message: "" }),
      ...(field === "audience" && value !== "custom" && { clientIds: [] }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.type || !formData.status || !formData.audience) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.type === "Template" && !formData.templateId) {
        throw new Error("Please select a template");
      }

      if (formData.type === "Custom" && !formData.message) {
        throw new Error("Please enter a custom message");
      }

      if (formData.audience === "custom" && formData.clientIds.length === 0) {
        throw new Error("Please select at least one client");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: formData.message || undefined,
          templateId: formData.templateId || undefined,
          clientIds: formData.audience === "custom" ? formData.clientIds : [],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create campaign");
      }

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      router.push("/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTemplate = templates.find(
    (t) => t.id === formData.templateId
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter campaign name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: CampaignType) =>
                      handleChange("type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Template">Template</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Campaign Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: CampaignStatus) =>
                      handleChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    value={formData.audience}
                    onValueChange={(value) => handleChange("audience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      <SelectItem value="active">Active Clients</SelectItem>
                      <SelectItem value="inactive">Inactive Clients</SelectItem>
                      <SelectItem value="custom">Custom Clients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === "Template" && (
                  <div className="space-y-2">
                    <Label htmlFor="templateId">Message Template</Label>
                    <Select
                      value={formData.templateId}
                      onValueChange={(value) =>
                        handleChange("templateId", value)
                      }
                    >
                      <SelectTrigger disabled={isLoadingTemplates}>
                        <SelectValue
                          placeholder={
                            isLoadingTemplates
                              ? "Loading templates..."
                              : "Select a template"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {formData.type === "Custom" && (
                <div className="space-y-2">
                  <Label htmlFor="message">Custom Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleChange("message", e.target.value)
                    }
                    placeholder="Enter your custom message"
                    rows={5}
                    required
                  />
                </div>
              )}

              {formData.type === "Template" && selectedTemplate && (
                <div className="space-y-2">
                  <Label>Template Preview</Label>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">
                      {selectedTemplate.content}
                    </p>
                    {selectedTemplate.variables.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          Variables:{" "}
                          {selectedTemplate.variables.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.audience === "custom" && (
                <div className="space-y-2">
                  <Label>Select Clients</Label>
                  <ClientSelection
                    selectedIds={formData.clientIds}
                    onSelectionChange={(ids) =>
                      handleChange("clientIds", ids)
                    }
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/campaigns")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || isLoadingTemplates}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Campaign"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
