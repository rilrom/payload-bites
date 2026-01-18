import type { PexelsResult } from "../../../classes/Pexels.js";

export const pexelsFixture: PexelsResult[] = [
	{
		id: "12345",
		alt: "Colorful sunset over the ocean",
		width: 3840,
		height: 2160,
		avg_color: "#f39c12",
		url: "https://www.pexels.com/photo/colorful-sunset-12345/",
		src: {
			medium:
				"https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?w=350",
			original:
				"https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
		},
		photographer: "Alice Cameraman",
		photographer_url: "https://www.pexels.com/@alicecameraman",
	},
	{
		id: "67890",
		alt: "",
		width: 2560,
		height: 1440,
		avg_color: "#27ae60",
		url: "https://www.pexels.com/photo/green-forest-67890/",
		src: {
			medium:
				"https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg?w=350",
			original:
				"https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg",
		},
		photographer: "Bob Snapper",
		photographer_url: "https://www.pexels.com/@bobsnapper",
	},
];
