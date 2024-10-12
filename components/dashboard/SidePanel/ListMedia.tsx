"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { SmallMedia } from "@/types/media";

const handleGetMedia = async (): Promise<SmallMedia[]> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userid = user?.id;
  console.log("USER ID: ", userid);

  try {
    const response = await fetch(
      `/api/media/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get media");
    }

    const data: SmallMedia[] = await response.json();
    console.log("Media fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return []; // Return an empty array in case of error
  }
};

function ListMedia() {
  const router = useRouter();
  const [media, setMedia] = useState<SmallMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const mediaData = await handleGetMedia();
      setMedia(mediaData);
      setLoading(false);
    };

    fetchMedia();
  }, []);

  const handleItemClick = (id: string) => {
    router.push(`/dashboard?itemId=${id}`);
  };

  return (
    <ScrollArea className="flex-grow p-4 border-b">
      <h2 className="mb-2 text-lg font-semibold">Your Items</h2>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <ul className="space-y-2">
          {media.map((item) => (
            <li
              key={item.id}
              className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  );
}

export default ListMedia;
