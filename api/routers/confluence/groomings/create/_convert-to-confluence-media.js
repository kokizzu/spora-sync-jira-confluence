import { traverse } from '@atlaskit/adf-utils/traverse';

export default (adf, { attachments }) => {
  let i = 0;

  return traverse(adf, {
    media (node) {
      const confluenceAttachmentData = attachments[i++];
      node.attrs = confluenceAttachmentData;
      return node;
    },
  });
};
