import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Link, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Setelah command dieksekusi, memperbarui state
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      // PENTING: Setel ulang fokus ke editor setelah command dieksekusi
      editorRef.current.focus();
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // memastikan editor sinkron dengan state dari luar
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Add placeholder functionality
  useEffect(() => {
    if (editorRef.current) {
      const isEmpty = editorRef.current.textContent?.trim() === '';
      if (isEmpty && placeholder) {
        editorRef.current.setAttribute('data-placeholder', placeholder);
      } else {
        editorRef.current.removeAttribute('data-placeholder');
      }
    }
  }, [value, placeholder]);

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: Heading1, command: 'formatBlock', value: '<h2>', title: 'Heading 1' },
    { icon: Heading2, command: 'formatBlock', value: '<h3>', title: 'Heading 2' },
    { icon: Heading3, command: 'formatBlock', value: '<h4>', title: 'Heading 3' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
  ];

  const insertLink = () => {
    const url = prompt('Masukkan URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
      {/* Add CSS for placeholder and text direction */}
      <style>
        {`
          [contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            font-style: italic;
          }
          /* Fix for text direction */
          [contenteditable] {
            direction: ltr !important; /* Tambahkan !important */
            text-align: left !important; /* Tambahkan !important */
            /* Anda juga bisa menambahkan unicode-bidi jika diperlukan */
            unicode-bidi: embed; /* Atau 'plaintext' jika masih bermasalah */
          }
        `}
      </style>

      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => (
          <button key={index} type="button" onClick={() => executeCommand(button.command, button.value)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200" title={button.title}>
            <button.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        ))}
        <button type="button" onClick={insertLink} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200" title="Insert Link">
          <Link className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        // dangerouslySetInnerHTML dihapus
        className="min-h-[300px] p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none prose dark:prose-invert max-w-none"
        style={{
          wordBreak: 'break-word',
          lineHeight: '1.6',
          // Nabrak sama index.css
          // direction: 'ltr', // Nabrak
          // textAlign: 'left' // Nabrak
        }}
      />
    </div>
  );
};

export default RichTextEditor;
