export default {
  name: "ElfSearchItem",
  inject: ["elfSearchForm"],
  render() {
    let labelWidth = this.labelWidth ?? this.elfSearchForm.labelWidth;

    return (
      <el-col xl={6} lg={6} md={8} xs={12} sm={12}>
        <el-form-item props={this.$attrs} labelWidth={labelWidth}>
          {this.$slots.default}
        </el-form-item>
      </el-col>
    );
  },
};
