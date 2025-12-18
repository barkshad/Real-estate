
/**
 * Uploads a file to Cloudinary using an unsigned preset.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = "ds2mbrzcn"; 
  const uploadPreset = "real_unsigned"; 
  
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
      const errorData = await response.json();
      console.error("Cloudinary error details:", errorData);
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw error;
  }
}
