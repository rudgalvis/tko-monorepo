export type KnitterUserReview = {
	knitter_id: string; // Knitter ID
	body: string; // Review body
	created_by: string; // Name of a reviewer
	created_at: Date; // ISO string
};

export type Knitter = {
	name: string;
	id: string; // Knitter ID
	description: string;
	photo: string; // src
	avatar: string; // src
};
