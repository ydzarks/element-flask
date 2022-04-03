export default {
  name: "ElfTag",
  props: {
    text: String,
    type: {
      type: String,
      default: "primary",
      validator(val) {
        return ["primary", "success", "warning", "danger", "info"].indexOf(val) > -1;
      },
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { type, plain } = this;
    const classes = ["elf-tag", `elf-tag-${type}`, plain ? "elf-tag-plain" : ""];
    return <span class={classes}>{this.$slots.default ?? this.text}</span>;
  },
};
