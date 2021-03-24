import * as adf from '@atlaskit/adf-utils/builders';
import axios from '~/api/modules/axios/--confluence';
import extractGroomingDoc from '~/api/utils/adf/extract-grooming-doc';
import buildSingleTable from './_build-single-table';
import getIssuesDetail from './_get-issues-detail';

export default async ({
  components,
  existing,
  issueKeys,
}) => {
  const existingAdf = JSON.parse(existing.body.atlas_doc_format.value);
  const existingIssues = extractGroomingDoc(existingAdf);
  const existingKeys = existingIssues.map(({ key }) => key);

  const issuesDetail = await getIssuesDetail(issueKeys, {
    contentId: existing.id,
  });

  const nonExistingIssues = issuesDetail.filter(({ key }) => (
    !existingKeys.includes(key)
  ));

  return axios.put(`/content/${existing.id}`, {
    title: existing.title,
    type: 'page',
    version: { number: existing.version.number + 1 },
    body: {
      atlas_doc_format: {
        value: JSON.stringify(
          adf.doc(
            ...existingAdf.content,
            ...nonExistingIssues.map(issue => (
              buildSingleTable(issue, { components })
            )),
          ),
        ),
        representation: 'atlas_doc_format',
      },
    },
  }).then(({ data }) => data);
};
