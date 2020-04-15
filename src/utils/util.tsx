import { replace, toLower } from 'lodash';
import React from 'react';

export const chartColors: string[] = [
	'#7cb5ec',
	'#434348',
	'#90ed7d',
	'#f7a35c',
	'#8085e9',
	'#f15c80',
	'#e4d354',
	'#2b908f',
	'#f45b5b',
	'#91e8e1',
];

export const formatPhone = (phoneNumber: string) => {
	if (phoneNumber) {
		return replace(replace(phoneNumber.toString(), /\D+/g, ''), /(\d{2})(\d{6})/, '$1 $2');
	}
	return '';
};

export const isValidEmail = (email: string) => {
	if (email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			toLower(String(email))
		);
	}
	return false;
};

type ChartOptions = {
	responsive: boolean;
	plugins: { datalabels: { color: string } };
};

export const chartOptions: ChartOptions = {
	responsive: true,
	plugins: {
		datalabels: {
			color: 'white',
		},
	},
};

export const lightenDarkenColor = (color: string, percent: number) => {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt(String((R * (100 + percent)) / 100), 10);
	G = parseInt(String((G * (100 + percent)) / 100), 10);
	B = parseInt(String((B * (100 + percent)) / 100), 10);

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
	const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
	const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

	return '#' + RR + GG + BB;
};

const escapeRegExpChars = (text: string) => {
	return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

export const highlightText = (text: string, query: string) => {
	let lastIndex = 0;
	const words = query
		.split(/\s+/)
		.filter((word) => word.length > 0)
		.map(escapeRegExpChars);
	if (words.length === 0) {
		return [text];
	}
	const regexp = new RegExp(words.join('|'), 'gi');
	const tokens: React.ReactNode[] = [];
	while (true) {
		const match = regexp.exec(text);
		if (!match) {
			break;
		}
		const length = match[0].length;
		const before = text.slice(lastIndex, regexp.lastIndex - length);
		if (before.length > 0) {
			tokens.push(before);
		}
		lastIndex = regexp.lastIndex;
		tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
	}
	const rest = text.slice(lastIndex);
	if (rest.length > 0) {
		tokens.push(rest);
	}
	return tokens;
};
