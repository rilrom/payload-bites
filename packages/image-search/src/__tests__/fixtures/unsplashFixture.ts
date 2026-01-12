import type { UnsplashResult } from "../../classes/Unsplash.js";

export const unsplashFixture: UnsplashResult[] = [
	{
		id: "abc123",
		alt_description: "A beautiful mountain landscape",
		width: 4000,
		height: 3000,
		color: "#2c3e50",
		urls: {
			thumb: "https://images.unsplash.com/photo-abc123?w=200",
			full: "https://images.unsplash.com/photo-abc123?w=4000",
		},
		links: {
			download: "https://unsplash.com/photos/abc123/download",
			download_location:
				"https://api.unsplash.com/photos/abc123/download?ixid=123",
		},
		user: {
			name: "John Photographer",
			links: {
				html: "https://unsplash.com/@johnphotographer",
			},
		},
	},
	{
		id: "def456",
		alt_description: "",
		width: 1920,
		height: 1080,
		color: "#e74c3c",
		urls: {
			thumb: "https://images.unsplash.com/photo-def456?w=200",
			full: "https://images.unsplash.com/photo-def456?w=1920",
		},
		links: {
			download: "https://unsplash.com/photos/def456/download",
			download_location:
				"https://api.unsplash.com/photos/def456/download?ixid=456",
		},
		user: {
			name: "Jane Artist",
			links: {
				html: "https://unsplash.com/@janeartist",
			},
		},
	},
];
