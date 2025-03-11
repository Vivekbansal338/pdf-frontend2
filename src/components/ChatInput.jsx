import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }) => theme.inputBorder};
  padding: 1rem;
  gap: 0.75rem;
  width: 100%;
`;

const TextInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
  }
`;

const SendButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => `${theme.primary}66`};
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export default function ChatInput({
  onSendMessage,
  isLoading,
  disabled,
  isLoadingHistory,
}) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const getPlaceholderText = () => {
    if (disabled && !isLoadingHistory) {
      return "Upload a PDF to start chatting";
    } else if (isLoadingHistory) {
      return "Loading chat history...";
    } else {
      return "Ask a question about your document...";
    }
  };

  return (
    <InputContainer>
      <form style={{ display: "flex", width: "100%" }} onSubmit={handleSubmit}>
        <TextInput
          ref={inputRef}
          type="text"
          placeholder={getPlaceholderText()}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled || isLoading}
        />
        <SendButton
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
        >
          <FaPaperPlane size={16} />
        </SendButton>
      </form>
    </InputContainer>
  );
}
