"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaUpload,
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaShare,
} from "react-icons/fa";
import Link from "next/link";
import { UploadModal } from "./UploadModal";
import { EditUserForm } from "./EditUserForm";
import { usePeople } from "../../hooks/usePeople";
import { useShareLinks } from "../../hooks/useShareLinks";
import { useToastContext } from "../contexts/ToastContext";
import { Button } from "./Button";

interface GalleryHeaderProps {
  photoCount: number;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
  personName?: string;
  onUploadComplete?: () => void;
}

export function GalleryHeader({
  photoCount,
  onToggleAllMonths,
  allExpanded,
  personName,
  onUploadComplete,
}: GalleryHeaderProps) {
  const {} = useTheme();
  const { people } = usePeople();
  const { createShareLink } = useShareLinks();
  const { showSuccess, showError } = useToastContext();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const person = people.find(
    (p) => p.name.toLowerCase() === personName?.toLowerCase()
  );

  const handleShare = async () => {
    if (!person) {
      showError("No person found - cannot create share link");
      return;
    }

    try {
      const shareLink = await createShareLink(person.id, person.name);

      if (shareLink) {
        const shareUrl = `${window.location.origin}/share/${shareLink.shareId}`;

        // Try to copy to clipboard with fallback
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareUrl);
            showSuccess("Share link created and copied to clipboard!");
          } else {
            // Fallback for non-secure contexts or older browsers
            const textArea = document.createElement("textarea");
            textArea.value = shareUrl;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
              document.execCommand("copy");
              showSuccess("Share link created and copied to clipboard!");
            } catch {
              showSuccess(`Share link created! Copy this URL: ${shareUrl}`);
            }

            document.body.removeChild(textArea);
          }
        } catch (clipboardError) {
          console.warn("Clipboard copy failed:", clipboardError);
          showSuccess(`Share link created! Copy this URL: ${shareUrl}`);
        }
      } else {
        showError("Failed to create share link");
      }
    } catch (error) {
      console.error("Failed to create share link:", error);
      showError(
        "Failed to create share link: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-white/90 /90 backdrop-blur-md border-b border-gray-100  mb-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
            {/* Left: Title and Count */}
            <div className='flex-1'>
              <Link
                href='/family'
                className='inline-flex items-center gap-2 text-gray-600  hover:text-gray-900 font-light transition-colors mb-2'
              >
                <span>←</span>
                <span className='hidden sm:inline'>Back to Family</span>
                <span className='sm:hidden'>Back</span>
              </Link>
              <h1 className='text-xl sm:text-2xl md:text-3xl font-light text-gray-900  capitalize'>
                {personName ? `${personName}'s Gallery` : "Photo Gallery"}
              </h1>
              <p className='text-sm text-gray-600  font-light'>
                {photoCount} photos
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
              <Button
                onClick={() => setShowEditModal(true)}
                disabled={!person}
                variant='ghost'
                size='sm'
                title='Edit person details'
                className='flex-shrink-0 hover:cursor-pointer disabled:cursor-not-allowed'
              >
                <FaEdit />
                <span className='hidden sm:inline'>Edit</span>
              </Button>

              <Button
                onClick={handleShare}
                disabled={!person}
                variant='ghost'
                size='sm'
                title='Share this gallery'
                className='flex-shrink-0 hover:cursor-pointer disabled:cursor-not-allowed'
              >
                <FaShare />
                <span className='hidden sm:inline'>Share</span>
              </Button>

              <Button
                onClick={() => setShowUploadModal(true)}
                disabled={!person}
                variant='primary'
                size='sm'
                title={
                  !person
                    ? `No person found for "${personName}" - upload disabled`
                    : "Upload photos"
                }
                className='flex-shrink-0 hover:cursor-pointer disabled:cursor-not-allowed'
              >
                <FaUpload />
                <span className='hidden sm:inline'>Upload</span>
              </Button>

              <Button
                onClick={onToggleAllMonths}
                variant='ghost'
                size='sm'
                aria-label={
                  allExpanded ? "Collapse all months" : "Expand all months"
                }
                className='flex-shrink-0 hover:cursor-pointer'
              >
                {allExpanded ? (
                  <>
                    <FaChevronUp />
                    <span className='hidden sm:inline'>Collapse All</span>
                  </>
                ) : (
                  <>
                    <FaChevronDown />
                    <span className='hidden sm:inline'>Expand All</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {person && (
        <>
          <UploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            personId={person.id}
            personName={person.name}
            onUploadComplete={onUploadComplete}
          />
          <EditUserForm
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            person={person}
          />
        </>
      )}
    </>
  );
}
