"use client";

import { useState } from "react";
import { useShareLinks } from "../../hooks/useShareLinks";
import { Button } from "./Button";
import { FaCopy, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

interface ShareLinkManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareLinkManager({ isOpen, onClose }: ShareLinkManagerProps) {
  const { shareLinks, loading, toggleShareLink, deleteShareLink } =
    useShareLinks();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = async (shareId: string) => {
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(shareId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleToggle = async (shareLinkId: string, isActive: boolean) => {
    await toggleShareLink(shareLinkId, isActive);
  };

  const handleDelete = async (shareLinkId: string) => {
    if (confirm("Are you sure you want to delete this share link?")) {
      await deleteShareLink(shareLinkId);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-light text-gray-900'>Share Links</h2>
          <Button onClick={onClose} variant='ghost' size='sm'>
            ✕
          </Button>
        </div>

        {loading ? (
          <div className='text-center py-8'>
            <div className='text-gray-600 font-light'>
              Loading share links...
            </div>
          </div>
        ) : shareLinks.length === 0 ? (
          <div className='text-center py-8'>
            <div className='text-gray-600 font-light'>
              No share links created yet
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              Create share links from individual gallery pages
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {shareLinks.map((link) => (
              <div
                key={link.id}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-gray-900'>
                      {link.personName}'s Gallery
                    </h3>
                    <p className='text-sm text-gray-600'>
                      Created {link.createdAt.toLocaleDateString()}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Views: {link.viewCount} •
                      {link.lastViewedAt &&
                        ` Last viewed: ${link.lastViewedAt.toLocaleDateString()}`}
                    </p>
                    <div className='mt-2'>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          link.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {link.isActive ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 ml-4'>
                    <Button
                      onClick={() => copyToClipboard(link.shareId)}
                      variant='ghost'
                      size='sm'
                      title='Copy share link'
                    >
                      <FaCopy />
                      {copiedId === link.shareId ? "Copied!" : "Copy"}
                    </Button>

                    <Button
                      onClick={() => handleToggle(link.id, !link.isActive)}
                      variant='ghost'
                      size='sm'
                      title={
                        link.isActive
                          ? "Disable share link"
                          : "Enable share link"
                      }
                    >
                      {link.isActive ? <FaEyeSlash /> : <FaEye />}
                    </Button>

                    <Button
                      onClick={() => handleDelete(link.id)}
                      variant='ghost'
                      size='sm'
                      title='Delete share link'
                      className='text-red-600 hover:text-red-700'
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='mt-6 pt-4 border-t border-gray-200'>
          <p className='text-sm text-gray-600'>
            Share links allow others to view galleries without signing in. You
            can disable or delete them at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
