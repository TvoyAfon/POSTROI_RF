 export interface GeoObjectCollection {
	metaDataProperty: GeocoderResponseMetaData;
	featureMember: GeoObjectFeature[];
}

interface GeocoderResponseMetaData {
	request: string;
	results: string;
	found: string;
}

interface GeoObjectFeature {
	GeoObject: GeoObjectDetails;
}

interface GeoObjectDetails {
	metaDataProperty: GeocoderMetaData;
	name: string;
	description: string;
	boundedBy: BoundedBy;
	uri: string;
	Point: Point;
}

interface GeocoderMetaData {
	precision: string;
	text: string;
	kind: string;
	Address: AddressDetails;
	AddressDetails: CountryDetails;
}

interface AddressDetails {
	country_code: string;
	formatted: string;
	Components: AddressComponent[];
}

interface AddressComponent {
	kind: string;
	name: string;
}

interface CountryDetails {
	AddressLine: string;
	CountryNameCode: string;
	CountryName: string;
	AdministrativeArea: AdministrativeArea;
}

interface AdministrativeArea {
	AdministrativeAreaName: string;
	SubAdministrativeArea: SubAdministrativeArea;
}

interface SubAdministrativeArea {
	SubAdministrativeAreaName: string;
	Locality: Locality;
}

interface Locality {
	LocalityName: string;
	Thoroughfare: Thoroughfare;
}

interface Thoroughfare {
	ThoroughfareName: string;
}

interface BoundedBy {
	Envelope: Envelope;
}

interface Envelope {
	lowerCorner: string;
	upperCorner: string;
}

interface Point {
	pos: string; // lat lng coordinate
}
