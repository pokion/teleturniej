declare interface Question {
	title: string;
	type: number;
	id?: string;
	indexNumber?: number;
	fileName?: string;
	answers?: Answer[];
}