"use client";

import { useState } from "react";
import {
  FaUpload,
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaShare,
} from "react-icons/fa";
import { UploadModal } from "./UploadModal";
import { EditUserForm } from "./EditUserForm";
import { EditAlbumForm } from "./EditAlbumForm";
import { useAlbums } from "../../hooks/useAlbums";
import { useShareLinks } from "../../hooks/useShareLinks";
import { useToastContext } from "../contexts/ToastContext";
import { Button } from "./Button";
import { Person } from "../../types";

interface GalleryActionButtonsProps {
  isPersonMode: boolean;
  isAlbumMode: boolean;
  personData?: Person;
  albumId?: string;
  albumName?: string;
  onUploadComplete?: () => void;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
}

export function GalleryActionButtons({
  isPersonMode,
  isAlbumMode,
  personData,
  albumId,
  albumName,
  onUploadComplete,
  onToggleAllMonths,
  allExpanded,
}: GalleryActionButtonsProps) {
  const { albums } = useAlbums();
  const { createShareLink } = useShareLinks();
  const { showSuccess, showError } = useToastContext();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const album = albums.find((a) => a.albumId === albumId);

  const handleShare = async () => {
    if (!personData) {
      showError("No person found - cannot create share link");
      return;
    }

    try {
      const shareLink = await createShareLink(personData.id, personData.name);

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
      <div className='flex items-center justify-between sm:justify-end gap-2 sm:gap-3'>
        {/* Edit button - show for both person and album mode */}
        {(isPersonMode || isAlbumMode) && (
          <Button
            onClick={() => setShowEditModal(true)}
            variant='ghost'
            size='sm'
            title={isPersonMode ? "Edit person details" : "Edit album details"}
            className='flex-shrink-0 hover:cursor-pointer'
          >
            <FaEdit />
            <span className='hidden sm:inline'>Edit</span>
          </Button>
        )}

        {/* Share button - only show for person mode */}
        {isPersonMode && (
          <Button
            onClick={handleShare}
            variant='ghost'
            size='sm'
            title='Share this gallery'
            className='flex-shrink-0 hover:cursor-pointer'
          >
            <FaShare />
            <span className='hidden sm:inline'>Share</span>
          </Button>
        )}

        {/* Upload button - show for both person and album mode */}
        <Button
          onClick={() => setShowUploadModal(true)}
          disabled={!isPersonMode && !isAlbumMode}
          variant='primary'
          size='sm'
          title={
            isPersonMode
              ? "Upload photos to this person's gallery"
              : isAlbumMode
              ? "Upload photos to this album"
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
          aria-label={allExpanded ? "Collapse all months" : "Expand all months"}
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

      {/* Modals */}
      {(isPersonMode || isAlbumMode) && (
        <>
          <UploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            personId={isPersonMode ? personData?.id : undefined}
            albumId={isAlbumMode ? albumId : undefined}
            personName={isPersonMode ? personData?.name : undefined}
            albumName={isAlbumMode ? albumName : undefined}
            storageId={isPersonMode ? personData?.storageId : albumId}
            onUploadComplete={onUploadComplete}
          />
          {isPersonMode && personData && (
            <EditUserForm
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              person={personData}
            />
          )}
          {isAlbumMode && album && (
            <EditAlbumForm
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              album={album}
            />
          )}
        </>
      )}
    </>
  );
}
