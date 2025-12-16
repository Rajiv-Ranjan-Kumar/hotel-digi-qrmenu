import { useState, useEffect } from "react";
import Modal from "../../../utils/elements/Modal";
import GalleryHeader from "./GalleryHeader";
import UploadSection from "./UploadSection";
import ImageGrid from "./ImageGrid";
import AIGenerateSection from "./AIGenerateSection";
import GalleryFooter from "./GalleryFooter";
import Tabs from "./Tabs";
import { get_images } from "../../../services/apis/common";
import type { UserGallery } from "../../../types/comman";




interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
}









export default function GalleryModal({ open, onClose}: GalleryModalProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState<UserGallery[]>([]);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);


  const fetch_gallery = async () => {
    setLoading(true);
    const response = await get_images();
    setLoading(false);

    if (!response.status){
      setImages([]);
      return;
    }

    const imglist = response.data?.items||[];
    const total = response.data?.count||0;

    setImages(imglist);
    setTotalImages(total);
  }


  useEffect(() => {
    if (open) {
      // Load images API
      fetch_gallery();
    }
  }, [open]);




  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );







  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-6xl h-[90vh] bg-(--primary-bg-color) rounded-xl flex flex-col shadow-xl">

        {/* HEADER */}
        <GalleryHeader search={search} setSearch={setSearch} onClose={onClose} />

        {/* TABS */}
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />

        {/* TAB PANELS */}
        <div className="flex-1 overflow-y-auto p-4">
          {tabIndex === 0 && (
              <ImageGrid
                images={filteredImages}
                selectedImageId={selectedImageId}
                setSelectedImageId={setSelectedImageId}
              />
          )}
          {tabIndex === 1 && <AIGenerateSection />}
        </div>

        {/* FOOTER */}
        <GalleryFooter
          images={images}
          selectedImageId={selectedImageId}
          onSelect={()=>{}}
        />
      </div>
    </Modal>
  );
}
