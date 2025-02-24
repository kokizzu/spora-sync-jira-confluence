const adf = require('@atlaskit/adf-utils/builders');
const axios = require('~/api/modules/axios/--confluence');
const buildPageInfo = require('~/api/utils/adf/build-page-info');

const { CONFLUENCE_GROOMING_PARENT_ID, SPACE_KEY } = process.env;

module.exports = (title) => {
  const body = JSON.stringify(adf.doc(
    buildPageInfo({ date: new Date() }),
  ));

  return axios.post('/content', {
    title,
    type: 'page',
    space: { key: SPACE_KEY },
    ancestors: [{ id: CONFLUENCE_GROOMING_PARENT_ID }],
    body: {
      atlas_doc_format: {
        value: body,
        representation: 'atlas_doc_format',
      },
    },
    metadata: {
      properties: {
        'content-appearance-draft': {
          value: 'full-width',
        },
        'content-appearance-published': {
          value: 'full-width',
        },
      },
    },
  }).then(({ data }) => ({
    body: { atlas_doc_format: { value: body } },
    id: data.id,
    title,
    version: data.version,
  }));
};
