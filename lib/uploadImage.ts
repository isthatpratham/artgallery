import { supabase } from "@/lib/supabaseClient"

/**
 * Uploads an image file to the Supabase storage bucket "order-images"
 * and returns the public URL of the uploaded image.
 * 
 * @param file - The image file to upload
 * @returns The public URL of the uploaded image
 * @throws Error if the upload fails
 */
export async function uploadImage(file: File): Promise<string> {
    // Generate a unique filename using timestamp and a random string
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // Upload the file to the "order-images" bucket
    const { error: uploadError } = await supabase.storage
        .from("order-images")
        .upload(filePath, file);

    if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get the public URL of the uploaded image
    const { data } = supabase.storage
        .from("order-images")
        .getPublicUrl(filePath);

    if (!data.publicUrl) {
        throw new Error("Failed to retrieve public URL for uploaded image");
    }

    return data.publicUrl;
}
