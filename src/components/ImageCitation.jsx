import React, { useState } from "react";
import styled from "styled-components";
import {
  FaImage,
  FaSpinner,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGetChatImage } from "../Services/Query/AllQuery";

const ImageCitationButton = styled.button`
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

  &:hover {
    background: ${({ theme }) => `${theme.primary}33`};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ErrorState = styled.div`
  color: #e53935;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const ImageCitation = ({ imageId, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: imageData,
    isPending,
    error,
  } = useGetChatImage(imageId, isOpen);

  const loading = isPending && isOpen && imageId;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ImageCitationButton onClick={handleOpen}>
        <FaImage size={10} />
        <span>{buttonLabel || "Image"}</span>
      </ImageCitationButton>

      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={handleClose}>
                <FaTimes />
              </CloseButton>

              <ImageContainer>
                {loading && (
                  <LoadingState>
                    <FaSpinner size={32} className="spinner" />
                    <span>Loading image...</span>
                  </LoadingState>
                )}

                {error && (
                  <ErrorState>
                    <FaExclamationCircle size={14} />
                    <span>{error}</span>
                  </ErrorState>
                )}

                {!loading && imageData?.imageData && (
                  <StyledImage src={imageData?.imageData} alt="Citation" />
                )}
              </ImageContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCitation;
