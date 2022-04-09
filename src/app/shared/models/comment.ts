export interface Comment {
    id?: number;
    postId: number;
    parent_id: number | null;
    user: string;
    date: string;
    content: string | null;

    // Populated after DB fetch, represents the comment / reply depth in the comments tree
    depth: number;
}