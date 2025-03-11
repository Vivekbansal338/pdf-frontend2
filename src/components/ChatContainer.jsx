import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { FaRobot, FaHistory, FaSpinner } from "react-icons/fa";
import { useChat, useGetChatHistory } from "../Services/Query/AllQuery";
import useStreamingMutation from "../hooks/useStreamingMutation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.background};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const WelcomeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.primary}33`},
    ${({ theme }) => `${theme.secondary}33`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WelcomeText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.iconColor};
  max-width: 400px;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  font-style: italic;

  .dot {
    margin-left: 4px;
    animation: dotAnimation 1.5s infinite;
    opacity: 0;
  }

  .dot:nth-child(2) {
    animation-delay: 0.5s;
  }

  .dot:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes dotAnimation {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const LoadingContainer = styled(WelcomeMessage)`
  .spinner {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function ChatContainer({ pdfLoaded, onCitationClick, pdfFile }) {
  const { mutation, streamingData, resetStreamingData } =
    useStreamingMutation();
  const { isPending: isMessagesPending, mutate: sendMessage } = useChat();
  const {
    isPending: isPendingChatHistory,
    data,
    refetch,
  } = useGetChatHistory(pdfFile?.id);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (
      data &&
      !isPendingChatHistory &&
      !isMessagesPending &&
      messages.length === 0
    ) {
      setMessages(data);
    }
  }, [data, isPendingChatHistory, isMessagesPending]);

  useEffect(() => {
    refetch();
    setMessages([]);
  }, [pdfFile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text) => {
    scrollToBottom();
    const userMessage = {
      text,
      timestamp: new Date(),
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);
    const finalData = {
      documentId: pdfFile.id,
      query: text,
    };
    // resetStreamingData();
    // mutation.mutate(finalData);

    sendMessage(
      {
        data: finalData,
      },
      {
        onSuccess: (data) => {
          const assistantMessage = {
            text: data.answer,
            citations:
              data.citations?.map((citation) => ({
                page: citation.page,
                text: citation.text,
                id: citation.id,
              })) || [],
            timestamp: new Date(),
            isUser: false,
          };

          setMessages((prevMessages) => [...prevMessages, assistantMessage]);
          setIsTyping(false);
        },
        onError: (error) => {
          console.error("Error getting response:", error);

          // Add error message
          const errorMessage = {
            text: "Sorry, I encountered an error processing your request. Please try again.",
            timestamp: new Date(),
            isUser: false,
            isError: true,
          };

          setMessages((prevMessages) => [...prevMessages, errorMessage]);
          setIsTyping(false);
        },
      }
    );
  };

  return (
    <Container>
      {pdfLoaded ? (
        <>
          <MessagesContainer>
            {/* {streamingData.map((chunk, index) => (
              <div key={index}>{JSON.stringify(chunk)}</div>
            ))} */}

            {isPendingChatHistory ? (
              <LoadingContainer>
                <WelcomeIcon>
                  <FaSpinner className="spinner" size={24} />
                </WelcomeIcon>
                <WelcomeTitle>Loading Chat History</WelcomeTitle>
                <WelcomeText>
                  Please wait while we retrieve your previous conversations with
                  this document.
                </WelcomeText>
              </LoadingContainer>
            ) : messages.length === 0 ? (
              <WelcomeMessage>
                <WelcomeIcon>
                  <FaRobot size={24} />
                </WelcomeIcon>
                <WelcomeTitle>Chat with your PDF</WelcomeTitle>
                <WelcomeText>
                  Ask questions about the content of your PDF document and get
                  instant, accurate answers with page references.
                </WelcomeText>
              </WelcomeMessage>
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isUser={message.isUser}
                  onCitationClick={onCitationClick}
                />
              ))
            )}

            {isTyping && (
              <TypingIndicator>
                Assistant is typing
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </TypingIndicator>
            )}

            <div ref={messagesEndRef} />
          </MessagesContainer>

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isTyping || isMessagesPending}
            disabled={!pdfLoaded || isPendingChatHistory}
            isLoadingHistory={isPendingChatHistory}
          />
        </>
      ) : (
        <>
          <MessagesContainer>
            <WelcomeMessage>
              <WelcomeIcon>
                <FaRobot size={24} />
              </WelcomeIcon>
              <WelcomeTitle>Upload a PDF to begin</WelcomeTitle>
              <WelcomeText>
                Upload a PDF document to start chatting. You can ask questions
                about the content and get instant answers.
              </WelcomeText>
            </WelcomeMessage>
          </MessagesContainer>

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isTyping || isMessagesPending}
            disabled={!pdfLoaded}
          />
        </>
      )}
    </Container>
  );
}
