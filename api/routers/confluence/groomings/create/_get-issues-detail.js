import axios from '~/api/modules/axios/--internal';
import convertToConfluenceMedia from './_convert-to-confluence-media';

import {
  ACCEPTANCE_KEY,
  CONSTRAINTS_KEY,
  DESCRIPTION_KEY,
  IMPLEMENTATION_KEY,
} from '~/api/constants/customfields';

export default keys => axios.get('/jira/search', {
  params: {
    keys: keys.join(','),
  },
}).then(async ({ data }) => {
  await Promise.all([
    ACCEPTANCE_KEY,
    CONSTRAINTS_KEY,
    DESCRIPTION_KEY,
    IMPLEMENTATION_KEY,
  ].map((key) => {
    convertToConfluenceMedia(data.data.fields[key]);
  }));

  return {
    ...data.data,
    fields: {
      ...data.data.fields,
    },
  };
});
