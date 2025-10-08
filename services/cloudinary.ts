export type UploadResult = { url: string; public_id?: string; original_filename?: string };

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

async function uploadToCloudinary(file: File, type: 'auto' | 'raw'): Promise<UploadResult> {
  if (!cloudName || !unsignedPreset) {
    throw new Error('Cloudinary environment variables are not set');
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', unsignedPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;
  const res = await fetch(endpoint, { method: 'POST', body: formData });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Upload failed');
  }
  const data = await res.json();
  return { url: data.secure_url, public_id: data.public_id, original_filename: data.original_filename };
}

export async function uploadDocument(file: File) {
  return uploadToCloudinary(file, 'raw');
}

export async function uploadAsset(file: File) {
  return uploadToCloudinary(file, 'auto');
}
