import { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/AuthSlice";

const StyledButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.primary}33`},
    ${({ theme }) => `${theme.secondary}33`}
  );
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalText = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.secondary}30;
  color: white;
  border: none;
  width: 140px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CancelButton = styled.button`
  width: 140px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.secondary}30;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function StartFreshButton() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleStartFresh = () => {
    dispatch(logoutSuccess());
    closeModal();
    window.location.reload();
  };

  return (
    <>
      {/* Button */}
      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <StyledButton onClick={openModal}>
          <FaPlus /> Start Fresh
        </StyledButton>
      </div>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Start Fresh</ModalTitle>
            <ModalText>
              Are you sure you want to start fresh? This will clear your current
              session. All processed PDF documents will be lost.
            </ModalText>
            <ButtonContainer>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <ConfirmButton onClick={handleStartFresh}>
                Yes, Start Fresh
              </ConfirmButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
