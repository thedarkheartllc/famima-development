"use client";

import { Person } from "../../types";
import { GalleryHeaderTitleDesktop } from "./GalleryHeaderTitleDesktop";
import { GalleryHeaderTitleMobile } from "./GalleryHeaderTitleMobile";

interface GalleryHeaderTitleProps {
  personName?: string;
  person?: Person;
  albumName?: string;
  photoCount: number;
  isAlbumMode: boolean;
}

export function GalleryHeaderTitle({
  personName,
  person,
  albumName,
  photoCount,
  isAlbumMode,
}: GalleryHeaderTitleProps) {
  return (
    <>
      <GalleryHeaderTitleDesktop
        personName={personName}
        person={person}
        albumName={albumName}
        photoCount={photoCount}
        isAlbumMode={isAlbumMode}
      />
      <GalleryHeaderTitleMobile
        personName={personName}
        person={person}
        albumName={albumName}
        photoCount={photoCount}
        isAlbumMode={isAlbumMode}
      />
    </>
  );
}
