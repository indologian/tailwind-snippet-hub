export type ComponentWithRelations = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    previewImage: string | null;
    htmlCode: string;
    createdAt: Date;
    updatedAt: Date;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    tags: {
        tag: {
            id: string;
            name: string;
        };
    }[];
};