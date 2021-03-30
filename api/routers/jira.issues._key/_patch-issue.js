const catchify = require('catchify');
const { traverse } = require('@atlaskit/adf-utils/traverse');
const { p, text } = require('@atlaskit/adf-utils/builders');
const axiosJira = require('~/api/modules/axios/--jira');
const axiosJiraV2 = require('~/api/modules/axios/--jira--v2');
const {
  COMPONENTS_KEY,
  STORY_POINTS_KEY,

  $fieldsWithEditor,
} = require('~/api/constants/customfields');

const mediaSign = '@#@';

module.exports = async (issue, { jiraAttachments }) => {
  const jiraAttachmentMap = jiraAttachments.reduce((acc, att) => ({
    ...acc,
    [att.confluence_reference.id]: att,
  }), {});

  const mediaToText = adf => traverse(adf, {
    mediaSingle (node) {
      const attRef = jiraAttachmentMap[node.content[0].attrs.id];
      return p(text([
        mediaSign,
        attRef.filename,
        '|',
        `width=${attRef.confluence_reference.width},height=${attRef.confluence_reference.height}`,
        mediaSign,
      ].join('')));
    },
  });

  const textToMedia = md => md.replace(new RegExp(mediaSign, 'g'), '!');

  // ---

  const [ePutV3] = await catchify(axiosJira.put(`/issue/${issue.key}`, {
    fields: {
      ...$fieldsWithEditor.reduce((acc, fieldKey) => ({
        ...acc,
        [fieldKey]: issue[fieldKey]
          ? mediaToText(issue[fieldKey])
          : null,
      }), {}),
      [COMPONENTS_KEY]: issue[COMPONENTS_KEY],
      [STORY_POINTS_KEY]: issue[STORY_POINTS_KEY],
    },
  }));
  if (ePutV3) throw ePutV3;

  const [
    eGetV2,
    issueV2,
  ] = await catchify(axiosJiraV2.get(`/issue/${issue.key}`, {
    params: { fields: $fieldsWithEditor.join(',') },
  }).then(({ data }) => data));
  if (eGetV2) throw eGetV2;

  const [ePutV2] = await catchify(axiosJiraV2.put(`/issue/${issue.key}`, {
    fields: {
      ...$fieldsWithEditor.reduce((acc, fieldKey) => ({
        ...acc,
        [fieldKey]: (issueV2.fields[fieldKey] || '').includes(mediaSign)
          ? textToMedia(issueV2.fields[fieldKey])
          : issueV2.fields[fieldKey],
      }), {}),
    },
  }));
  if (ePutV2) throw ePutV2;

  const [
    eGetV3,
    issueV3,
  ] = await catchify(axiosJira.get(`/issue/${issue.key}`, {
    params: { fields: $fieldsWithEditor.join(',') },
  }).then(({ data }) => data));
  if (eGetV3) throw eGetV3;

  return axiosJira.put(`/issue/${issue.key}`, {
    fields: {
      ...$fieldsWithEditor.reduce((acc, fieldKey) => ({
        ...acc,
        [fieldKey]: issueV3.fields[fieldKey]
          ? traverse(issueV3.fields[fieldKey], {
            mediaSingle (node) {
              node.attrs.layout = 'align-start';
              return node;
            },
          }) : null,
      }), {}),
    },
  });
};
