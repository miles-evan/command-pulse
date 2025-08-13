





export const Colors = {
	accent: "#0077ff",
	softAccent: "#80a8ff",
	
	danger: "#F01111",
	softDanger: "#ff7f7f",
	
	altAccent: "#4ba326",
	
	ai: "#BF35FF",
	aiAccent: "#F7ABFF",
	
	white: "#ffffff",
	verySoft: "#fbfbfb",
	softer: "#EAEAEA",
	soft: "#c7c7c7",
	mediumSoft: "#aaaaaa",
	medium: "#797979",
	mediumHard: "#5b5b5b",
	hard: "#303030",
	veryHard: "#161616",
	black: "#000000",
	
	blend(color1Name, color2Name) {
		const hex1 = Colors[color1Name];
		const hex2 = Colors[color2Name];
		if (!hex1 || !hex2) throw new Error("Invalid color name");
		
		const rgb1 = [
			parseInt(hex1.slice(1, 3), 16),
			parseInt(hex1.slice(3, 5), 16),
			parseInt(hex1.slice(5, 7), 16)
		];
		const rgb2 = [
			parseInt(hex2.slice(1, 3), 16),
			parseInt(hex2.slice(3, 5), 16),
			parseInt(hex2.slice(5, 7), 16)
		];
		
		const blendedRgb = rgb1.map((v, i) => Math.round((v + rgb2[i]) / 2));
		return `#${blendedRgb.map(v => v.toString(16).padStart(2, "0")).join("")}`;
	}
};

Object.freeze(Colors);