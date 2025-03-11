import { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.background};
`;

const SidePanel = styled.div`
  flex: ${({ expanded }) => (expanded ? 1 : 0)};
  min-width: ${({ expanded }) => (expanded ? "40%" : "0")};
  max-width: ${({ expanded }) => (expanded ? "60%" : "0")};
  height: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
  border-right: ${({ expanded, theme }) =>
    expanded ? `1px solid ${theme.inputBorder}` : "none"};
`;

const MainPanel = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${({ expanded }) => (expanded ? "calc(50% - 0px)" : "-10px")};
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0 30px 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  color: ${({ theme }) => theme.primary};
`;

export default function SplitView({ leftComponent, rightComponent }) {
  const [chatExpanded, setChatExpanded] = useState(true);

  const toggleChat = () => {
    setChatExpanded(!chatExpanded);
  };

  return (
    <Container>
      <SidePanel expanded={chatExpanded}>{leftComponent}</SidePanel>

      <ToggleButton expanded={chatExpanded} onClick={toggleChat}>
        {chatExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </ToggleButton>

      <MainPanel>{rightComponent}</MainPanel>
    </Container>
  );
}
