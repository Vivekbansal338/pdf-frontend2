import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import {
  useUploadDocument,
  useGetUserDocuments,
} from "../Services/Query/AllQuery";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  height: 300px;
  border-radius: 16px;
  border: 2px dashed
    ${({ theme, isDragActive }) =>
      isDragActive ? theme.primary : theme.inputBorder};
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.primary}33`},
    ${({ theme }) => `${theme.secondary}33`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const UploadIcon = styled(FaUpload)`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.iconColor};
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;

const ProgressOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ProgressCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
`;

const ProgressHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const ProgressTitle = styled.h3`
  color: ${({ theme }) => theme.text};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  border-radius: 4px;

  @keyframes indeterminateAnimation {
    0% {
      width: 30%;
      left: -30%;
    }
    100% {
      width: 30%;
      left: 100%;
    }
  }

  animation: indeterminateAnimation 1.5s infinite ease-in-out;
  position: relative;
`;

const SuccessMessage = styled.p`
  color: #2ecc71;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
`;

export default function PDFUploader({ onPDFUpload }) {
  const { refetch } = useGetUserDocuments();
  const { isPending: isUploadPending, mutate } = useUploadDocument();
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    const filesize = file.size / 1024 / 1024;
    if (filesize > 10) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setError("");

    const finalData = {
      file: file,
      fileName: file.name,
    };

    mutate(
      { data: finalData },
      {
        onSuccess: (data) => {
          const resdata = {
            id: data.documentId,
            name: data.fileName,
            url: data.link,
          };

          setUploadSuccess(true);

          // Show success message for 2 seconds before hiding
          setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(false);
            refetch();
            onPDFUpload(resdata);
          }, 2000);
        },
        onError: (error) => {
          setError("Upload failed. Please try again.");
          setTimeout(() => {
            setIsUploading(false);
          }, 2000);
          refetch();
          console.log("error", error);
        },
      }
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      if (file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        return;
      }

      handleFileUpload(file);
    }
  }, []);

  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        return;
      }

      handleFileUpload(file);
    }
  }, []);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <UploadContainer
        isDragActive={isDragActive}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleContainerClick}
      >
        <IconContainer>
          <UploadIcon />
        </IconContainer>
        <Title>Upload PDF to start chatting</Title>
        <Subtitle>Click or drag and drop your file here</Subtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FileInput
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileInputChange}
        />
      </UploadContainer>

      {isUploading && (
        <ProgressOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                {uploadSuccess ? "Upload Complete" : "Uploading PDF"}
              </ProgressTitle>
            </ProgressHeader>

            {uploadSuccess ? (
              <SuccessMessage>
                Your PDF has been successfully uploaded!
              </SuccessMessage>
            ) : (
              <ProgressBarContainer>
                <ProgressBarFill />
              </ProgressBarContainer>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </ProgressCard>
        </ProgressOverlay>
      )}
    </>
  );
}
