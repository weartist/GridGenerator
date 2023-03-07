import React from "react";
import styles from '@/styles/Home.module.css'

interface Props {
  repository: string;
}

const GitHubRepoLink: React.FC = () => {
  const url = `https://github.com/weartist/GridGenerator`;
  return (
    <div className="FlexView">
    <i >powered by:&nbsp;</i>
    <a  href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
    </div>
  );
};

export default GitHubRepoLink;