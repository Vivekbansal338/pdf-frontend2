import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUser, FaRobot, FaQuoteRight, FaBookOpen } from "react-icons/fa";

const MessageContainer = styled(motion.div)`
  display: flex;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme, isUser }) =>
    isUser
      ? `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`
      : theme.inputBg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  color: ${({ theme, isUser }) => (isUser ? theme.buttonText : theme.primary)};
`;

const MessageContent = styled.div`
  flex: 1;
  background: ${({ theme, isUser }) =>
    isUser
      ? `linear-gradient(45deg, ${theme.primary}11, ${theme.secondary}11)`
      : theme.inputBg};
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid
    ${({ theme, isUser }) =>
      isUser ? theme.primary + "22" : theme.inputBorder};
`;

const Sender = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${({ theme, isUser }) => (isUser ? theme.primary : theme.text)};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
  line-height: 1.5;
`;

const CitationsContainer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.inputBorder + "66"};
  padding-top: 0.75rem;
`;

const CitationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.iconColor};
  margin-bottom: 0.75rem;
`;

const CitationsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Citation = styled.button`
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary}22,
    ${({ theme }) => theme.secondary}22
  );
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  border-radius: 8px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;

  &:hover {
    background: ${({ theme }) => `${theme.primary}33`};
  }
`;

const CitationTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  background: ${({ theme }) => "#000000"};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 8px;
  padding: 0.75rem;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  line-height: 1.4;

  ${Citation}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const CitationText = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  font-style: italic;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
`;

const CitationPage = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const CitationButton = ({ citation, onClick }) => {
  return (
    <Citation onClick={() => onClick(citation.page)}>
      <FaBookOpen size={10} />
      <span>Page {citation.page}</span>
      <CitationTooltip>
        <CitationText>"{citation.text}"</CitationText>
        <CitationPage>From page {citation.page}</CitationPage>
      </CitationTooltip>
    </Citation>
  );
};

export default function ChatMessage({
  message,
  isUser,
  onCitationClick,
  animate = true,
}) {
  const messageAnimation = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  const hasCitations =
    !isUser && message.citations && message.citations.length > 0;

  return (
    <MessageContainer {...messageAnimation}>
      <Avatar isUser={isUser}>
        {isUser ? <FaUser size={14} /> : <FaRobot size={14} />}
      </Avatar>
      <MessageContent isUser={isUser}>
        <Sender isUser={isUser}>{isUser ? "You" : "Assistant"}</Sender>
        <Text>{message.text}</Text>

        {hasCitations && (
          <CitationsContainer>
            <CitationHeader>
              <FaQuoteRight size={12} />
              <span>Sources ({message.citations.length})</span>
            </CitationHeader>
            <CitationsWrapper>
              {message.citations.map((citation, index) => (
                <CitationButton
                  key={index}
                  citation={citation}
                  onClick={onCitationClick}
                />
              ))}
            </CitationsWrapper>
          </CitationsContainer>
        )}
      </MessageContent>
    </MessageContainer>
  );
}
