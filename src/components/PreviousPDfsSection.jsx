import styled from "styled-components";
import { useState } from "react";
import { FaFilePdf, FaHistory } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useGetUserDocuments } from "../Services/Query/AllQuery";

const PreviousPDFsSectionCon = styled.div`
  // margin-top: 2rem;
  width: 100%;
  max-width: 500px;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const PDFList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const PDFItem = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary};
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.7;
    cursor: default;
    &:hover {
      transform: none;
      box-shadow: none;
      border-color: ${props.theme.inputBorder};
    }
  `}
`;

const PDFIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.8rem;
`;

const PDFIcon = styled(FaFilePdf)`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const ProcessingIcon = styled(ImSpinner8)`
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PDFName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PDFDate = styled.p`
  color: ${({ theme }) => theme.iconColor};
  font-size: 0.8rem;
  text-align: center;
  margin-top: 0.3rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  background-color: ${({ status, theme }) =>
    status === "processing" ? theme.warning : theme.success};
  color: white;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.danger};
  text-align: center;
  margin: 1rem 0;
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin: 2rem 0;
  font-style: italic;
`;

// New loading components
const LoadingContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
`;

const LoadingSpinner = styled(ImSpinner8)`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  animation: spin 1s linear infinite;
  margin: 0 auto;
  display: block;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const PlaceholderList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const PlaceholderItem = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const PlaceholderIcon = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBorder};
  margin: 0 auto;
  margin-bottom: 0.8rem;
`;

const PlaceholderName = styled.div`
  height: 0.9rem;
  width: 80%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBorder};
  margin: 0 auto;
  margin-bottom: 0.8rem;
`;

const PlaceholderDate = styled.div`
  height: 0.8rem;
  width: 60%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBorder};
  margin: 0 auto;
`;

// New styled components for icon and modal
const HeaderContainer = styled.div`
  width: ${({ increase }) => (increase ? "80px" : "50px")};
  height: ${({ increase }) => (increase ? "80px" : "50px")};
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.primary}33`},
    ${({ theme }) => `${theme.secondary}33`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PDFHistoryIcon = styled(FaHistory)`
  font-size: ${({ increase }) => (increase ? "2rem" : "1.8rem")};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.9);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.2rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
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

export default function PreviousPDFsSection({
  onPDFUpload,
  increase,
  currentpdf,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPending, error, data } = useGetUserDocuments();

  const handlePreviousPDFClick = (pdf) => {
    if (pdf.status === "processing") return;
    onPDFUpload(pdf);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderisPending = () => {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading your documents...</LoadingText>
        <PlaceholderList>
          {[...Array(4)].map((_, index) => (
            <PlaceholderItem key={index}>
              <PlaceholderIcon />
              <PlaceholderName />
              <PlaceholderDate />
            </PlaceholderItem>
          ))}
        </PlaceholderList>
      </LoadingContainer>
    );
  };

  const renderError = () => {
    return (
      <ErrorMessage>Error loading your documents: {error.message}</ErrorMessage>
    );
  };

  const renderPDFList = () => {
    if (!data || data.length === 0) {
      return (
        <EmptyMessage>
          No documents found. Upload a PDF to get started.
        </EmptyMessage>
      );
    }

    return (
      <PDFList>
        {data.map((doc) => (
          <PDFItem
            key={doc.id}
            onClick={() => handlePreviousPDFClick(doc)}
            disabled={doc.status === "processing" || doc.id === currentpdf?.id}
          >
            <PDFIconContainer>
              {doc.status === "processing" ? <ProcessingIcon /> : <PDFIcon />}
            </PDFIconContainer>
            <PDFName>{doc.name}</PDFName>
            {doc.id === currentpdf?.id && <PDFDate>Already Selected</PDFDate>}
            <PDFDate>{new Date(doc.uploadDate).toLocaleDateString()}</PDFDate>
            {doc.status === "processing" && (
              <StatusBadge status="processing">Processing</StatusBadge>
            )}
          </PDFItem>
        ))}
      </PDFList>
    );
  };

  return (
    <PreviousPDFsSectionCon>
      {/* <HeaderContainer increase={increase}>
        <PDFHistoryIcon
          onClick={openModal}
          increase={increase}
          title="View previous PDFs"
        />
      </HeaderContainer> */}

      <StyledButton onClick={openModal}>
        <FaHistory /> View Previous PDFs
      </StyledButton>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Your Previous PDFs</ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>

            {isPending
              ? renderisPending()
              : error
              ? renderError()
              : renderPDFList()}
          </ModalContent>
        </ModalOverlay>
      )}
    </PreviousPDFsSectionCon>
  );
}
