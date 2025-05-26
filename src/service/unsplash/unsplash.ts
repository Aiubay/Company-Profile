// services/unsplash/unsplash.ts

// Define the UnsplashPhoto interface
export interface UnsplashPhoto {
  id: string;
  alt_description: string | null;
  width: number; // Added width
  height: number; // Added height
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  // Add other properties if needed
}

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.warn(
    "Unsplash Access Key is missing or invalid. Please set NEXT_PUBLIC_UNSPLASH_ACCESS_KEY in your environment variables or replace the placeholder."
  );
}

/**
 * Fetches a specified number of random photos from Unsplash.
 * @param count The number of random photos to fetch (default is 5).
 * @param query Optional search query for photos.
 * @returns A promise that resolves to an array of UnsplashPhoto objects.
 * @throws An Error if the API request fails or the access key is invalid.
 */
export async function fetchRandomUnsplashPhotos(
  count: number = 5,
  query: string = ""
): Promise<UnsplashPhoto[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error(
      "Unsplash Access Key is not configured. Cannot fetch photos."
    );
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query
      )}&count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      const errorData: any = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `HTTP error! Status: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data: UnsplashPhoto[] = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn(
        "Unsplash API returned a non-array response, expected an array:",
        data
      );
      // If a single object is returned (e.g., count=1), wrap it in an array
      if (data && typeof data === "object" && !Array.isArray(data)) {
        return [data];
      }
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching random Unsplash photos:", error);
    throw new Error(
      `Failed to fetch photos: ${error.message || "Unknown error"}`
    );
  }
}
