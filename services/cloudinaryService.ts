
/**
 * Uploads a file to Cloudinary using an unsigned preset.
 * Requires a Cloudinary Cloud Name and an Unsigned Upload Preset.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = "YOUR_CLOUDINARY_CLOUD_NAME"; // Replace with yours
  const uploadPreset = "YOUR_UNSIGNED_PRESET";   // Replace with yours
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  // Determine if it's a video or image
  const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Cloudinary upload failed');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw error;
  }
}
