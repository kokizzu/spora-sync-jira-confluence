import axios from '../_/axios-jira-agile';

const { BOARD_ID } = process.env;

export default ({ state }) => axios.get(`/board/${BOARD_ID}/sprint`, {
  params: { state },
}).then(({ data }) => (
  data.values
    .filter(({ originBoardId }) => `${originBoardId}` === `${BOARD_ID}`)
    .map(({ id, name, state }) => ({ id, name, state }))
    .reduce((acc, sprint) => ({
      ...acc,
      ...(sprint.state === 'active'
        ? { active: sprint }
        : { futures: [...acc.futures, sprint] }),
    }), { futures: [], active: null })
));
