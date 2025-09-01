export const CreatePostMessages = {
  tags: {
    invalidFormat: 'Tags should be array of strings',
    invalidTagFormat: 'Tag should be string',
    maxLength: 'Maximum tags length must be 10',
  },
  type: {
    value: 'Type can be one of the following type: video, link, image, quote, text',
  },
  status: {
    value: 'Status can be one of the following: published, draft',
  }
};
