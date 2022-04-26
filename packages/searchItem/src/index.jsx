export default {
  name: "ElfSearchItem",
  inject: ["elfSearchForm"],
  props: {
    xs: {
      type: [Number, Object],
      default: 12,
    },
    sm: {
      type: [Number, Object],
      default: 12,
    },
    md: {
      type: [Number, Object],
      default: 8,
    },
    lg: {
      type: [Number, Object],
      default: 6,
    },
    xl: {
      type: [Number, Object],
      default: 6,
    },
  },
  render() {
    let labelWidth = this.labelWidth ?? this.elfSearchForm.labelWidth;

    return (
      <el-col xl={this.xl} lg={this.lg} md={this.md} xs={this.xs} sm={this.sm}>
        <el-form-item props={this.$attrs} labelWidth={labelWidth}>
          {this.$slots.default}
        </el-form-item>
      </el-col>
    );
  },
};
