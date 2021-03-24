import postGrooming from './_post-grooming';

const { CONFLUENCE_URL } = process.env;

export const post = async (req, res) => {
  const { issues: issueKeys } = req.body;

  const data = await postGrooming({
    issueKeys,
  });

  res.json({
    data: {
      id: data.id,
      title: data.title,
      url: new URL(`/wiki${data._links.webui}`, CONFLUENCE_URL).href,
    },
  });
};
