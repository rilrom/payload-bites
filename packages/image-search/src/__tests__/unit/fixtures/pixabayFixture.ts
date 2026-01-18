import type { PixabayResult } from "../../../classes/Pixabay.js";

export const pixabayFixture: PixabayResult[] = [
	{
		id: "111222",
		imageWidth: 5000,
		imageHeight: 3333,
		webformatURL: "https://pixabay.com/get/abc123_640.jpg",
		largeImageURL: "https://pixabay.com/get/abc123_1280.jpg",
		imageURL: "https://pixabay.com/get/abc123_full.jpg",
		user: "PhotoMaster",
		user_id: 9999,
	},
	{
		id: "333444",
		imageWidth: 1920,
		imageHeight: 1280,
		webformatURL: "https://pixabay.com/get/def456_640.jpg",
		largeImageURL: "https://pixabay.com/get/def456_1280.jpg",
		imageURL: "",
		user: "ImagePro",
		user_id: 8888,
	},
];
