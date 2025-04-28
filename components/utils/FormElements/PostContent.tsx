// components/PostContent.tsx
"use client";

export function PostContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-slate max-w-none [&_*]:m-0 [&_*]:p-0 [&_h1]:mb-1 [&_h2]:mb-1 [&_h3]:mb-1 [&_p]:mb-1 [&_ul]:ml-4 [&_ol]:ml-4"
      style={{
        margin: 0,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
