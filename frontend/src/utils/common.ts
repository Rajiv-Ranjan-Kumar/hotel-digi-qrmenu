// utils/getCroppedImg.ts
export default function getCroppedImg(
    file: File,
    crop: { x: number; y: number; width: number; height: number },
    outputWidth: number = 400,
    outputHeight: number = 400
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result as string;

            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = outputWidth;
                canvas.height = outputHeight;
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    reject(new Error("Cannot get canvas context"));
                    return;
                }

                // Draw the cropped area scaled to outputWidth/outputHeight
                ctx.drawImage(
                    image,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    outputWidth,
                    outputHeight
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error("Canvas is empty"));
                        return;
                    }
                    resolve(blob);
                }, "image/jpeg", 0.9);
            };

            image.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);
    });
}
