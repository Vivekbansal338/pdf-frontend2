import { useMutation, useQueryClient } from "@tanstack/react-query";
const BASE_URL = import.meta.env.VITE_API_URL;
import { useSelector } from "react-redux";
import { useState } from "react";

function useStreamingMutation() {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [streamingData, setStreamingData] = useState([]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${BASE_URL}/chat/chatstream`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();

      // Process the stream
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // console.log("Chunk", value);

        // Parse the chunk (assuming chunks are valid JSON strings)
        try {
          const text = new TextDecoder().decode(value);

          console.log("Text", text);

          // Handle multiple JSON objects in a single chunk (if applicable)
          const lines = text.split("\n").filter((line) => line.trim());

          console.log("Lines", lines);

          for (const line of lines) {
            const chunkData = JSON.parse(line);

            console.log("Chunk data", chunkData);
            // Update state with the new chunk
            setStreamingData((prev) => [...prev, chunkData]);
          }
        } catch (e) {
          console.error("Error parsing chunk:", e);
        }
      }

      // Return the complete data for mutation result
      return streamingData;
    },
    onSuccess: (data) => {
      // Update any queries that should be invalidated
      queryClient.invalidateQueries({ queryKey: ["relevantData"] });
    },
  });

  return {
    mutation,
    streamingData,
    resetStreamingData: () => setStreamingData([]),
  };
}

export default useStreamingMutation;
