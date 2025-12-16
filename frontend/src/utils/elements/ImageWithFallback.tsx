import React, { useState, useEffect } from "react";


interface Props {
  src: string;
  name: string;
}



const ImageWithFallback: React.FC<Props> = ({ src, name }) => {
  const [isError, setIsError] = useState(false);

  const firstChar = name ? name.charAt(0).toUpperCase() : "N";

  
  useEffect(() => {
    setIsError(false);
  }, [src]);




  return (
    <>
      {!isError ? (
        <img
          src={src}
          loading="lazy"
          alt={name}
          onError={() => setIsError(true)}
          className="w-10 h-10 rounded-full object-cover mx-auto"
        />
      ) : (
        <div
          className="
            w-10 h-10 rounded-full 
            flex items-center justify-center 
            text-sm font-medium mx-auto
            text-(--accent-color)
            bg-(--secondary-bg-color)
            border border-[var(--secondary-text-color)/40]
          "
        >
          {firstChar}
        </div>
      )}
    </>
  );
};

export default ImageWithFallback;
