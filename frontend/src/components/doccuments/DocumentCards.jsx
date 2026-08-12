import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, BookOpen, BrainCircuit, Clock } from 'lucide-react';
import moment from 'moment';

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === undefined || bytes === null) return 'N/A';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCards = ({
  document,
  onDelete
}) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/documents/${document._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(document);
  };

 return (
  <div
    className="group relative bg-white/80 background-blur-xl border-slate-200/60 rounded-2xl p-5 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    onClick={handleNavigate}
  >
    {/* Header Section */}
    <div className='flex items-center justify-between gap-3 mb-4'>
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center">
  <FileText
    className="w-6 h-6 text-white"
    strokeWidth={2}
  />
</div>

      <button
    onClick={handleDelete}
    className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
  >
    <Trash2 className="w-4 h-4" strokeWidth={2} />
  </button>
    </div>

    {/* Title */}
    <h3
      className="text-base font-semibold text-slate-900 truncate mb-2"
      title={document.title}
    >
      {document.title}
    </h3>

    {/* Document Info */}
    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
      {document.fileSize !== undefined && (
        <>
          <span className="font-medium">
            {formatFileSize(document.fileSize)}
          </span>
        </>
      )}
    </div>

    {/* Stats Section */}
    <div className="flex items-center gap-3">
      {document.flashcardCount !== undefined && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 rounded-lg">
          <BookOpen className="w-3.5 h-3.5  text-purple-800" strokeWidth={2} />
          <span className="text-xs font-semibold text-purple-700">
            {document.flashcardCount} Flashcards
          </span>
        </div>
      )}

      {document.quizCount !== undefined && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg">
       <BrainCircuit
  className="w-3.5 h-3.5 text-[var(--teal)]"
  strokeWidth={2}
/>

<span className="text-xs font-semibold text-[var(--teal-dark)]">
            {document.quizCount} Quizzes
          </span>
        </div>
      )}
    </div>

    {/* Footer Section */}
    <div className="mt-5 pt-4 border-slate-100">
      <div className="flex items-center gap-1.5 text-slate-500">
        <Clock className="" strokeWidth={2} />
        <span>
          Uploaded {moment(document.createdAt).fromNow()}
        </span>
      </div>
    </div>

    {/* Hover Indicator */}
 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--teal)]/10 to-[var(--light-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);
};

export default DocumentCards;