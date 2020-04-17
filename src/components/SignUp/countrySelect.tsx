import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import * as React from 'react';

export interface ICountryProps {
	name: string;
	code: string;
	dial_code: string;
}

export const renderCountry: ItemRenderer<ICountryProps> = (country, { handleClick, modifiers, query }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}
	return (
		<MenuItem
			active={modifiers.active}
			disabled={modifiers.disabled}
			label={country.dial_code}
			key={country.code}
			onClick={handleClick}
			text={highlightText(country.name, query)}
		/>
	);
};

export const filterCountry: ItemPredicate<ICountryProps> = (query, country, _index, exactMatch) => {
	const normalizedTitle = country.name.toLowerCase();
	const normalizedQuery = query.toLowerCase();

	if (exactMatch) {
		return normalizedTitle === normalizedQuery;
	} else {
		return `${normalizedTitle} ${country.dial_code}`.indexOf(normalizedQuery) >= 0;
	}
};

const escapeRegExpChars = (text: string) => {
	return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

const highlightText = (text: string, query: string) => {
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

export const CountrySelectProps = {
	itemPredicate: filterCountry,
	itemRenderer: renderCountry,
};
