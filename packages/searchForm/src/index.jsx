export default {
  name: "ElfSearchForm",
  provide() {
    return {
      elfSearchForm: this,
    };
  },
  props: {
    labelWidth: {
      type: String,
      default: "70px",
    },
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      expandFlag: this.defaultExpand,
    };
  },
  render() {
    let searchItems = this.$slots.default ?? [];

    if (!this.expandFlag && this.expand) {
      searchItems = searchItems.slice(0, 4);
    }

    return (
      <el-form class="elf-search-form" props={this.$attrs} labelWidth={this.labelWidth} labelPosition="right">
        <el-container>
          <el-main class="elf-search-form__content">
            <el-row ref="formItemArea" type="flex">
              {searchItems}
              <el-form-item class="elf-search-form__btn">
                <el-button type="primary" onclick="$emit('query')">
                  查 询
                </el-button>
                {this._renderReset()}
                {this._renderExpand()}
              </el-form-item>
            </el-row>
          </el-main>
        </el-container>
      </el-form>
    );
  },
  methods: {
    _renderReset() {
      return this.reset ? (
        <el-button type="default" onclick="$emit('reset')">
          重 置
        </el-button>
      ) : null;
    },
    _renderExpand() {
      let searchItems = this.$slots.default ?? [];
      if (this.expand && searchItems.length > 4) {
        let arrowClass = ["el-icon-d-arrow-right"];
        if (this.expandFlag) {
          arrowClass.push("expand");
        }

        return (
          <el-button
            type="default"
            onclick={() => {
              this.expandFlag = !this.expandFlag;
            }}
          >
            {this.expandFlag ? "收起" : "展开"}
            <i class={arrowClass}></i>
          </el-button>
        );
      } else {
        return null;
      }
    },
  },
};
