# PDF AI Assistant

## Overview

PDF AI Assistant is a React-based application that enables users to upload PDF documents and engage in conversational interactions about their content. The application provides an intuitive interface for uploading, viewing, and chatting about PDF documents, with AI-generated responses that include citations to relevant pages.

## Key Features

### 📄 PDF Document Management

- **Upload System**: Drag-and-drop or click-to-upload interface for PDF files
- **Document Viewer**: Built-in PDF viewer with page navigation and zoom controls
- **Document History**: Access to previously uploaded documents

### 💬 Interactive Chat

- **Contextual Conversations**: Ask questions about PDF content and receive relevant answers
- **Citations**: AI responses include citations that link to specific PDF pages
- **Chat History**: Persistent chat history for each document

### 🎨 UI/UX Features

- **Split Screen Interface**: Adjustable split view between PDF viewer and chat
- **Responsive Design**: Optimized for various screen sizes and devices
- **Session Management**: Option to start fresh and reset session

## Technical Architecture

### Frontend Technologies

- **React 19** with hooks and functional components
- **React Router** for navigation
- **Styled Components** for styling
- **React PDF** for PDF rendering

### State Management

- **Redux Toolkit** for global state (auth and theme)
- **React Query** for API state management and server synchronization
- **Redux Persist** for persistence of user data

### API Integration

- **REST API** communication for chat and document operations
- **JWT** for authentication

## Application Structure

### Core Components

- **[`PDFViewer`](src/components/PDFViewer.jsx)**: Renders PDF with navigation controls
- **[`ChatContainer`](src/components/ChatContainer.jsx)**: Manages chat messages and interactions
- **[`SplitView`](src/components/SplitView.jsx)**: Creates resizable split layout
- **[`PreviousPDFsSection`](src/components/PreviousPDfsSection.jsx)**: Displays document history

### Pages

- **[`HomePage2`](src/pages/HomePage2.jsx)**: Main application page with split view
- **[`Protect`](src/pages/Protect.jsx)**: Authentication wrapper for routes

### Services

- **API Services**: Handles communication with backend
- **Query Hooks**: Custom hooks for API operations using React Query

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Vivekbansal338/pdf-frontend2.git
   cd pdf-ai-assistant
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   VITE_API_URL=https://your-api-url.com/api
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Usage Guide

1. **Upload a PDF**: Drag and drop a PDF or click to select one
2. **View the PDF**: Navigate pages using controls or jump to specific pages
3. **Ask Questions**: Type queries about the document in the chat interface
4. **Review Answers**: Read AI-generated responses with page citations
5. **Click Citations**: Jump to cited PDF pages by clicking on page references
6. **View History**: Access previously uploaded documents

## Environment Configuration

- `VITE_API_URL`: Backend API endpoint

## Backend Integration

The application communicates with a backend service that provides:

- Document processing and storage
- AI-powered question answering
- User authentication
- Chat history persistence

## License

[MIT License](LICENSE)

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
