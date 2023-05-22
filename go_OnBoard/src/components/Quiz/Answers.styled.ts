import styled from "styled-components";

export const Answer = styled.button`
  background-color: white;
  color: var(--primary-1);
  font-weight: 500;
  border: 1px solid var(--primary-2);
  display: flex;

  box-sizing: border-box;

  transition: color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    opacity: 1;
    box-shadow: inset 800px 0 0 0 var(--secondary-1);
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
