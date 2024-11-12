export interface WatchProvider {
	id: number;
	results: Results;
}

export interface Results {
	AD: Ad;
	AE: AE;
	AL: Ad;
	AR: Ar;
	AT: AE;
	AU: AE;
	BA: Ad;
	BE: AE;
	BG: AE;
	BO: Ad;
	BR: Ad;
	BZ: Ad;
	CA: AE;
	CH: AE;
	CL: AE;
	CO: AE;
	CR: Ad;
	CV: AE;
	CY: AE;
	CZ: AE;
	DE: AE;
	DK: AE;
	DO: Ad;
	EC: AE;
	EE: AE;
	EG: AE;
	ES: AE;
	FI: AE;
	FR: AE;
	GB: AE;
	GH: AE;
	GR: AE;
	GT: Ad;
	HK: Ad;
	HN: Ad;
	HR: AE;
	HU: AE;
	ID: Ad;
	IE: AE;
	IL: IL;
	IN: AE;
	IS: AE;
	IT: AE;
	JM: Ad;
	JP: AE;
	KR: AE;
	LC: Ad;
	LI: Ad;
	LT: AE;
	LU: AE;
	LV: AE;
	ME: Ad;
	MK: Ad;
	MT: Ad;
	MX: Ad;
	MY: Ad;
	MZ: AE;
	NI: Ad;
	NL: AE;
	NO: AE;
	NZ: AE;
	PA: Ad;
	PE: AE;
	PH: Ad;
	PL: AE;
	PT: AE;
	PY: Ad;
	RO: Ad;
	RS: Ad;
	RU: AE;
	SA: AE;
	SE: AE;
	SG: Ad;
	SI: AE;
	SK: AE;
	SM: Ad;
	SV: Ad;
	TH: Ad;
	TR: AE;
	TT: Ad;
	TW: Ad;
	UA: AE;
	UG: AE;
	US: AE;
	UY: Ad;
	VE: AE;
	ZA: AE;
}

export interface Ad {
	link: string;
	flatrate: Flatrate[];
}

export interface Flatrate {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

export interface AE {
	link: string;
	rent?: Flatrate[];
	buy: Flatrate[];
	flatrate?: Flatrate[];
}

export interface Ar {
	link: string;
	buy: Flatrate[];
	flatrate: Flatrate[];
}

export interface IL {
	link: string;
	buy: Flatrate[];
}
