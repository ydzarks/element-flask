<template>
  <div class="el-steps el-steps--vertical">
    <slot></slot>
  </div>
</template>

<script>
import Migrating from "element-ui/src/mixins/migrating";

export default {
  name: "ElfSteps",

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    alignCenter: Boolean,
    finishStatus: {
      type: String,
      default: "finish",
    },
    processStatus: {
      type: String,
      default: "process",
    },
  },

  data() {
    return {
      steps: [],
      stepOffset: 0,
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: "center is removed.",
        },
      };
    },
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit("change", newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    },
  },
};
</script>
