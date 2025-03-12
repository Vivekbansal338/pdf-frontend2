import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaSearchMinus,
  FaSearchPlus,
  FaTrash,
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
  margin-top: 50px;
`;

const PDFContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => `${theme.inputBg}99`};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.inputBg};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }) => theme.inputBorder};
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  min-width: 80px;
  text-align: center;
`;

const ControlButton = styled.button`
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.primary}33`};
    color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${({ theme }) => theme.inputBg};
      color: ${({ theme }) => theme.text};
    }
  }
`;

const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledDocument = styled(Document)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .react-pdf__Document {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledPage = styled(Page)`
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .react-pdf__Page__canvas {
    border-radius: 8px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  height: 200px;
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  gap: 1rem;
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export default function PDFViewer({ pdfFile, highlightPage, clearPDF }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  const documentOptions = useMemo(
    () => ({
      cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/",
      cMapPacked: true,
    }),
    []
  );

  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setError(null);
    setKey((prev) => prev + 1);
  }, [pdfFile]);

  useEffect(() => {
    if (highlightPage && numPages && highlightPage <= numPages) {
      setPageNumber(highlightPage);
    }
  }, [highlightPage, numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setError("Failed to load PDF. Please try uploading again.");
  };

  const previousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const nextPage = () => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  };

  const handleZoomIn = () => {
    setScale((prev) => prev + 0.2);
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.6, prev - 0.2));
  };

  return (
    <ViewerContainer>
      <PDFContainer>
        {pdfFile ? (
          error ? (
            <ErrorContainer>
              <ErrorIcon>
                <FaExclamationTriangle />
              </ErrorIcon>
              <div>{error}</div>
            </ErrorContainer>
          ) : (
            <StyledDocument
              key={key}
              file={pdfFile instanceof Blob ? pdfFile : pdfFile.url || pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<LoadingContainer>Loading PDF...</LoadingContainer>}
              options={documentOptions}
              error={
                <ErrorContainer>
                  <ErrorIcon>
                    <FaExclamationTriangle />
                  </ErrorIcon>
                  <div>Error loading PDF. Please try again.</div>
                </ErrorContainer>
              }
            >
              {numPages > 0 && (
                <StyledPage
                  key={`page_${pageNumber}_${scale}`}
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  error={
                    <div>Error loading this page. Try changing pages.</div>
                  }
                />
              )}
            </StyledDocument>
          )
        ) : (
          <LoadingContainer>No PDF loaded</LoadingContainer>
        )}
      </PDFContainer>

      <ControlsContainer>
        <ControlButton onClick={clearPDF} disabled={!pdfFile}>
          <FaTrash />
        </ControlButton>

        <ControlButton
          onClick={previousPage}
          disabled={!numPages || pageNumber <= 1}
        >
          <FaChevronLeft />
        </ControlButton>

        <PageInfo>
          {pageNumber} / {numPages || "?"}
        </PageInfo>

        <ControlButton
          onClick={nextPage}
          disabled={!numPages || pageNumber >= numPages}
        >
          <FaChevronRight />
        </ControlButton>

        <ZoomControls>
          <ControlButton onClick={handleZoomOut}>
            <FaSearchMinus />
          </ControlButton>
          <ControlButton onClick={handleZoomIn}>
            <FaSearchPlus />
          </ControlButton>
        </ZoomControls>
      </ControlsContainer>
    </ViewerContainer>
  );
}
