import { useEffect, useState } from "react";

export const useResponsivePostsPerPage = () => {
  const [postsPerPage, setPostsPerPage] = useState(9); // default

  useEffect(() => {
    const updatePostsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPostsPerPage(3);
      } else if (width >= 640 && width < 768) {
        setPostsPerPage(6);
      } else {
        setPostsPerPage(9);
      }
    };

    updatePostsPerPage(); // initial run
    window.addEventListener("resize", updatePostsPerPage);

    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  return postsPerPage;
};
