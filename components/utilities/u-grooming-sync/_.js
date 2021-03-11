import catchify from 'catchify';
import axios from 'axios';

export default {
  props: {
    issue: { type: Object, required: true },
  },

  data: () => ({
    isFetched: false,
    isLoading: false,

    isFailed: false,
    isSuccess: false,
  }),

  methods: {
    async clickCallback () {
      if (this.isSuccess) return;

      this.isLoading = true;

      const [errUpdate] = await catchify(
        axios.patch(`/api/jira/issues/${this.issue.key}`, {
          issue: this.issue,
        }),
      );

      this.isSuccess = !errUpdate;
      this.isFailed = !!errUpdate;

      this.isFetched = true;
      this.isLoading = false;
    },
  },

  mounted () {
    this.$el.addEventListener('click', this.clickCallback.bind(this), true);
  },

  render (h) {
    return this.$scopedSlots.default({
      isLoading: this.isLoading,

      isFailed: this.isFailed,
      isSuccess: this.isSuccess,
    });
  },
};
