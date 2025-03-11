import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../utils/useTheme";
import SplitView from "../components/SplitView";
import ChatContainer from "../components/ChatContainer";
import PDFViewer from "../components/PDFViewer";
import PDFUploader from "../components/PDFUploader";
import PreviousPDFsSection from "../components/PreviousPDfsSection";
import StartFreshButton from "../components/StartFreshButton";

const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
`;

const PDFViewerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ pdfLoaded }) => (pdfLoaded ? "flex-start" : "center")};
  padding: ${({ pdfLoaded }) => (pdfLoaded ? "0" : "2rem")};
`;

function HomePage2() {
  const [pdfFile, setPdfFile] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();

  const handlePDFUpload = (fileData) => {
    setPdfFile(fileData);
  };

  const handleCitationClick = (pageNumber) => {
    const intPageNumber = parseInt(pageNumber);
    if (
      !isNaN(intPageNumber) &&
      intPageNumber > 0 &&
      intPageNumber !== currentPage
    ) {
      setCurrentPage(intPageNumber);
    }
  };

  const clearPDF = () => {
    setPdfFile(null);
    setCurrentPage(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <StartFreshButton />

        <SplitView
          leftComponent={
            <ChatContainer
              pdfLoaded={!!pdfFile}
              pdfFile={pdfFile}
              onCitationClick={handleCitationClick}
            />
          }
          rightComponent={
            <PDFViewerContainer pdfLoaded={!!pdfFile}>
              {pdfFile ? (
                <PDFViewer
                  pdfFile={pdfFile}
                  highlightPage={currentPage}
                  clearPDF={clearPDF}
                />
              ) : (
                <PDFUploader onPDFUpload={handlePDFUpload} />
              )}
            </PDFViewerContainer>
          }
        />

        <div
          style={
            pdfFile
              ? {
                  position: "fixed",
                  bottom: "5px",
                  right: "10px",
                  zIndex: 1000,
                }
              : {
                  position: "fixed",
                  bottom: "15px",
                  right: "10px",
                  zIndex: 1000,
                }
          }
        >
          <PreviousPDFsSection
            onPDFUpload={handlePDFUpload}
            increase={!pdfFile}
            currentpdf={pdfFile}
          />
        </div>
      </PageContainer>
    </ThemeProvider>
  );
}

export default HomePage2;
