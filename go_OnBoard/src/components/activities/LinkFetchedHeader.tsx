import { StyledLinkFetchedHeader } from "./Activities.styled";

interface LinkFetchedHeaderProps {
  text: string;
}

const LinkFetchedHeader: React.FC<LinkFetchedHeaderProps> = ({ text }) => {
  return <StyledLinkFetchedHeader>{text}</StyledLinkFetchedHeader>;
};

export default LinkFetchedHeader;
