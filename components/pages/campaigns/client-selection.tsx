"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

interface ClientSelectionProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function ClientSelection({ selectedIds, onSelectionChange }: ClientSelectionProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
        if (!response.ok) throw new Error("Failed to fetch clients");
        const data = await response.json();
        setClients(data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber.includes(searchTerm) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleClient = (clientId: string) => {
    const newSelection = selectedIds.includes(clientId)
      ? selectedIds.filter((id) => id !== clientId)
      : [...selectedIds, clientId];
    onSelectionChange(newSelection);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Search Clients</Label>
        <Input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <Label>Selected Clients: {selectedIds.length}</Label>
        <ScrollArea className="h-[300px] border rounded-md mt-2 p-4">
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="flex items-start space-x-3">
                <Checkbox
                  id={client.id}
                  checked={selectedIds.includes(client.id)}
                  onCheckedChange={() => handleToggleClient(client.id)}
                />
                <label
                  htmlFor={client.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="font-medium">{client.name}</div>
                  <div className="text-muted-foreground">{client.phoneNumber}</div>
                  {client.email && (
                    <div className="text-muted-foreground text-xs">{client.email}</div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 