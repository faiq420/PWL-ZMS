// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { useCallback, useEffect } from "react";
import { Label } from "@/components/ui/label";

interface TiptapEditorProps {
  value: string;
  setter: (name: string, value: string) => void;
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  subfield?: string;
  isRequired?: boolean;
  onEnterPress?: () => void;
  className?: string;
  editorHeight?: number | string;
}

export const TextEditor = ({
  value,
  setter,
  name,
  placeholder = "Write something...",
  label,
  disabled = false,
  subfield,
  isRequired = false,
  onEnterPress,
  className = "",
  editorHeight = 300,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "tiptap-bullet-list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setter(name, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `tiptap-editor ${disabled ? "tiptap-disabled" : ""}`,
        style: `min-height: ${
          typeof editorHeight === "number" ? `${editorHeight}px` : editorHeight
        }`,
        placeholder,
      },
    },
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && onEnterPress && !event.shiftKey) {
        event.preventDefault();
        onEnterPress();
      }
    },
    [onEnterPress]
  );

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    const editorElement = editor?.view.dom;
    if (editorElement) {
      editorElement.addEventListener("keydown", handleKeyDown);
      return () => {
        editorElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [editor, handleKeyDown]);

  const addImage = useCallback(() => {
    if (editor) {
      const url = window.prompt("Enter the URL of the image:");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      if (url === null) {
        return;
      }

      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return (
      <div
        className={`rounded-md border bg-gray-50 animate-pulse ${className}`}
        style={{
          height:
            typeof editorHeight === "number"
              ? `${editorHeight}px`
              : editorHeight,
        }}
      />
    );
  }

  return (
    <div className={`space-y-2 flex-1 ${className}`}>
      {(label || subfield) && (
        <div className="flex items-center gapx-1 py-[2px]p-2">
          {label && (
            <Label htmlFor={name}>
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          {subfield && (
            <span className="text-muted-foreground text-xs">{`(${subfield})`}</span>
          )}
        </div>
      )}

      <div className="rounded-md border bg-background text-sm">
        {editor && !disabled && (
          <div className="border-b p-1 flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("bold") ? "bg-gray-200" : ""
              }`}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("italic") ? "bg-gray-200" : ""
              }`}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("underline") ? "bg-gray-200" : ""
              }`}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
            >
              Underline
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("strike") ? "bg-gray-200" : ""
              }`}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
              Strike
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`px-1 py-[2px] rounded ${
                editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-xl font-bold">H1</span>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`px-1 py-[2px] rounded ${
                editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-lg font-bold">H2</span>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`px-1 py-[2px] rounded ${
                editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-base font-bold">H3</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("bulletList") ? "bg-gray-200" : ""
              }`}
            >
              Bullet List
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-1 py-[2px] rounded ${
                editor.isActive("orderedList") ? "bg-gray-200" : ""
              }`}
            >
              Ordered List
            </button>
            <button
              type="button"
              onClick={addImage}
              className="px-1 py-[2px] rounded"
            >
              Image
            </button>
          </div>
        )}

        {editor && (
          <BubbleMenu editor={editor}>
            <div className="flex gap-1 bg-white p-1 rounded shadow border">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-1 py-[2px] rounded ${
                  editor.isActive("bold") ? "bg-gray-200" : ""
                }`}
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-1 py-[2px] rounded ${
                  editor.isActive("italic") ? "bg-gray-200" : ""
                }`}
              >
                Italic
              </button>
              <button
                type="button"
                onClick={setLink}
                className={`px-1 py-[2px] rounded ${
                  editor.isActive("link") ? "bg-gray-200" : ""
                }`}
              >
                Link
              </button>
            </div>
          </BubbleMenu>
        )}

        <EditorContent
          editor={editor}
          className={`p-2 overflow-auto max-h-[300px] ${disabled ? "bg-gray-50" : ""}`}
          style={{
            minHeight:
              typeof editorHeight === "number"
                ? `${editorHeight}px`
                : editorHeight,
          }}
        />
      </div>
    </div>
  );
};
