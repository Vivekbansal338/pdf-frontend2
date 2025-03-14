import {
  getToken2,
  getChatHistory,
  getChatImage,
  chat,
  verifyToken,
  uploadDocument,
  getUserDocuments,
  getDocumentById,
} from "../Apis/AllServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/AuthSlice";

export const useLogin2 = () => {
  const token = useSelector((state) => state.auth.token);
  console.log("useLogin2", token);
  const { isPending, error, data, refetch, isLoading } = useQuery({
    queryKey: ["getToken2"],
    queryFn: () => getToken2(),
    enabled: !token,
    select: (data) => {
      if (data) {
        const dispatch = useDispatch();
        dispatch(loginSuccess({ token: data }));
      }
      return data;
    },
  });
  return { isPending, error, data, refetch, isLoading };
};

export const useVerifyToken = () => {
  const { isPending, error, mutate, reset, isError } = useMutation({
    mutationFn: (token) => verifyToken(token),
  });
  return { isPending, error, mutate, reset, isError };
};

export const useChat = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, mutate, reset, isError } = useMutation({
    mutationFn: ({ data }) => chat(token, data),
  });
  return { isPending, error, mutate, reset, isError };
};

export const useGetChatHistory = (documentId) => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getChatHistory", documentId],
    queryFn: () => getChatHistory(token, documentId),
    select: (data) => {
      const formattedMessages = [];
      data.forEach((item) => {
        formattedMessages.push({
          text: item.query,
          timestamp: new Date(item.timestamp),
          isuser: true,
        });
        formattedMessages.push({
          text: item.answer,
          timestamp: new Date(item.timestamp),
          isuser: false,
          citations:
            item.citations?.map((citation) => ({
              id: citation.id,
              page: citation.page,
              text: citation.text,
            })) || [],
          citationImages:
            item.citations?.flatMap((citation) =>
              citation.images.map((image) => image.id)
            ) || [],
        });
      });
      return formattedMessages;
    },
  });
  return { isPending, error, data, refetch };
};

export const useGetChatImage = (imageId, enabled = true) => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getChatImage", imageId],
    queryFn: () => getChatImage(token, imageId),
    enabled: !!imageId && !!enabled,
  });
  return { isPending, error, data, refetch };
};

export const useUploadDocument = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, mutate, reset, isError } = useMutation({
    mutationFn: ({ data }) => uploadDocument(token, data),
  });
  return { isPending, error, mutate, reset, isError };
};

export const useGetUserDocuments = (enabled = true) => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getUserDocuments"],
    queryFn: () => getUserDocuments(token),
    enabled: !!enabled,
    select: (data) => {
      return data?.documents.map((doc) => ({
        ...doc,
        url: doc.link,
      }));
    },
  });
  return { isPending, error, data, refetch };
};

export const useGetDocumentById = (documentId, enabled = true) => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getDocumentById", documentId],
    queryFn: () => getDocumentById(token, documentId),
    enabled: !!enabled && !!documentId,
  });
  return { isPending, error, data, refetch };
};
