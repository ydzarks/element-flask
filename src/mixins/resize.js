import { WRSubject } from "../utils/rxjs";

export default {
  data() {
    return {
      observe: undefined,
    };
  },
  activated() {
    this.resetHeight();
  },
  mounted() {
    this.resetHeight();
    this.addResizeWatch();
  },
  beforeDestory() {
    this.removeResizeWatch();
  },
  methods: {
    resetHeight() {
      console.warn("请覆盖resetHeight的方法！！！");
    },
    addResizeWatch() {
      this.observe = WRSubject.subscribe(() => {
        this.resetHeight();
      });
    },
    removeResizeWatch() {
      if (this.observe && this.observe.unsubscribe) {
        this.observe.unsubscribe();
      }
    },
  },
};
