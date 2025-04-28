import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  pathData: { text: string; path?: string }[];
}

const Breadcrumb = ({ pathData }: Props) => {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      {pathData.map((path: { text: string; path?: string }, index: number) =>
        path.path != undefined ? (
          <span className="flex items-center" key={index}>
            <Link href={path.path} className="hover:text-main-jungleGreen">
              {path.text}
            </Link>
            {index != pathData.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </span>
        ) : (
          <span className="flex items-center" key={index}>
            <span className="font-medium">{path.text}</span>
            {index != pathData.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </span>
        )
      )}
    </div>
  );
};

export default Breadcrumb;
