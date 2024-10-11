'use client';

import { useState } from "react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import { createClient } from "@/utils/supabase/client";

const ButtonNewMedia = () => {

  const [name, setName] = useState('');

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userid = user?.id;
    console.log("USER ID: ", userid);
    
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, user_id: userid }),
      });

      if (!response.ok) {
        throw new Error('Failed to create media');
      }

      const data = await response.json();
      console.log('Media created:', data);
    } catch (error) {
      console.error('Error creating media:', error);
    }
  };

  return (
    <div className="p-4 border-b">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Media</DialogTitle>
            <DialogDescription>
              Add a new item to your dashboard here.
            </DialogDescription>
          </DialogHeader>
          {/* Add your form or content for creating new items here */}
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter media name"
              required
            />
            <Button type="submit" className="mt-2 w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonNewMedia;
