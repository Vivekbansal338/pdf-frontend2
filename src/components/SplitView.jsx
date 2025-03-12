import { useState, useEffect } from "react";
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
  flex: ${({ viewState }) =>
    viewState === "left" ? 2 : viewState === "middle" ? 1 : 0};
  height: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
  border-right: ${({ viewState, theme }) =>
    viewState === "right" ? "none" : `1px solid ${theme.inputBorder}`};
`;

const MainPanel = styled.div`
  flex: ${({ viewState }) =>
    viewState === "right" ? 2 : viewState === "middle" ? 1 : 0};
  height: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const LeftToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${({ viewState }) =>
    viewState === "left"
      ? "calc(100% - 30px )"
      : viewState === "middle"
      ? "calc(50%)"
      : "-30px"};
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: ${({ viewState }) =>
    viewState === "left" ? "30px 0 0 30px" : "0 30px 30px 0"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  color: ${({ theme }) => theme.primary};
  visibility: ${({ viewState }) =>
    viewState === "right" ? "hidden" : "visible"};

  @media (min-width: 768px) {
    visibility: hidden;
  }
`;

const RightToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: ${({ viewState }) =>
    viewState === "right"
      ? "calc(100% - 30px)"
      : viewState === "middle"
      ? "calc(50%)"
      : "-30px"};
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: ${({ viewState }) =>
    viewState === "right" ? "0 30px 30px 0" : "30px 0 0 30px"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  color: ${({ theme }) => theme.primary};
  visibility: ${({ viewState }) =>
    viewState === "left" ? "hidden" : "visible"};
`;

export default function SplitView({ leftComponent, rightComponent }) {
  const [viewState, setViewState] = useState("middle");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        if (viewState === "middle") {
          setViewState("left");
        }
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [viewState]);

  const toggleLeft = () => {
    if (isMobile) {
      setViewState("right");
    } else {
      setViewState(viewState === "left" ? "middle" : "left");
    }
  };

  const toggleRight = () => {
    if (isMobile) {
      setViewState("left");
    } else {
      setViewState(viewState === "right" ? "middle" : "right");
    }
  };

  return (
    <Container>
      <SidePanel viewState={viewState}>{leftComponent}</SidePanel>

      <LeftToggleButton viewState={viewState} onClick={toggleLeft}>
        {viewState === "left" ? <FaChevronLeft /> : <FaChevronRight />}
      </LeftToggleButton>

      <RightToggleButton viewState={viewState} onClick={toggleRight}>
        {viewState === "right" ? <FaChevronRight /> : <FaChevronLeft />}
      </RightToggleButton>

      <MainPanel viewState={viewState}>{rightComponent}</MainPanel>
    </Container>
  );
}
