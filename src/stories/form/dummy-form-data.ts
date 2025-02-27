export const DummyFormData = {
	// make for checklist
	acceptTerms: [],
	countrySelection: "us",
	birthDate: "656014948",
	priceRange: {
		from: 100,
		to: 650,
	},
	firstName: "John",
	skills: ["javascript", "react"],
	nicknames: ["Johnny", "JJ"],
	favoriteWebsites: [
		"https://developer.mozilla.org",
		"https://stackoverflow.com",
	],
	preferredContactMethod: "email",
	volumeLevel: 70,
	favoriteFruit: "apple",
	bio: "I am a frontend developer who loves coding and learning new technologies.",
	subscribeToNewsletter: true,
	notificationSettings: ["agree_privacy_policy", "enable_notifications"],
	favoriteAnimal: ["elephant", "lion"],
};

export const formOptions = {
	countrySelection: [
		{ label: "United States", value: "us" },
		{ label: "Canada", value: "ca" },
		{ label: "United Kingdom", value: "uk" },
		{ label: "Australia", value: "au" },
	],
	skills: [
		{ label: "JavaScript", value: "javascript" },
		{ label: "React", value: "react" },
		{ label: "TypeScript", value: "typescript" },
		{ label: "Node.js", value: "nodejs" },
	],
	preferredContactMethod: [
		{ label: "Email", value: "email" },
		{ label: "Phone", value: "phone" },
		{ label: "Text Message", value: "sms" },
	],
	favoriteFruit: ["Apple", "Banana", "Cherry", "Mango"],
	notificationSettings: [
		{ label: "I agree to the Privacy Policy", value: "agree_privacy_policy" },
		{ label: "Subscribe to updates", value: "subscribe_updates" },
		{ label: "Enable notifications", value: "enable_notifications" },
	],
	favoriteAnimal: [
		{ label: "Elephant", value: "elephant" },
		{ label: "Python", value: "python" },
		{ label: "Lion", value: "lion" },
	],
};
