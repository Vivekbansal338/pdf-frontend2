import styled from "styled-components";
import { FaFileAlt } from "react-icons/fa";

const CitationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => `${theme.secondary}20`};
  color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.secondary}40`};
    transform: translateY(-1px);
  }
`;

export default function Citation({ page, onClick }) {
  return (
    <CitationButton onClick={onClick}>
      <FaFileAlt size={12} />
      Page {page}
    </CitationButton>
  );
}
