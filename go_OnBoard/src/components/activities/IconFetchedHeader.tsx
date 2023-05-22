import React, { useState, useEffect } from "react";
import { StyledLinkFetchedHeader } from "./Activities.styled";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface IconFetchedHeaderProps {
  iconName: string;
}

const IconFetchedHeader: React.FC<IconFetchedHeaderProps> = ({ iconName }) => {
  const [iconURL, setIconURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      const storage = getStorage();
      const iconRef = ref(storage, iconName);
      const url = await getDownloadURL(iconRef);
      setIconURL(url);
    };

    if (iconName) {
      fetchIcon();
    }
  }, [iconName]);

  return (
    <StyledLinkFetchedHeader>
      {iconURL && (
        <img
          src={iconURL}
          alt={iconName}
        />
      )}
    </StyledLinkFetchedHeader>
  );
};

export default IconFetchedHeader;
