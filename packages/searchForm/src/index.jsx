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
    configure: {
      type: Boolean,
      default: false,
    },
    customConfigure: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      expandFlag: this.defaultExpand,
      searchItems: [],
    };
  },
  computed: {
    enabledSearchItemsProp() {
      return this.searchItems.filter((item) => item.enable).map((item) => item.prop);
    },
  },
  created() {
    let searchVNodes = this.$slots.default ?? [];
    this.searchItems = searchVNodes.map((vnode) => {
      return { ...vnode.data.attrs, enable: true };
    });
  },
  render() {
    let searchVNodes = this.$slots.default ?? [];

    if (this.configure) {
      searchVNodes = searchVNodes.filter((vnode) => {
        return this.enabledSearchItemsProp.indexOf(vnode.data.attrs.prop) >= 0;
      });
    }

    if (!this.expandFlag && this.expand) {
      searchVNodes = searchVNodes.slice(0, 4);
    }

    return (
      <el-form class="elf-search-form" props={this.$attrs} labelWidth={this.labelWidth} labelPosition="right">
        <el-container>
          <el-main class="elf-search-form__content">
            <el-row ref="formItemArea" type="flex">
              {searchVNodes}
              <el-form-item class="elf-search-form__btn">
                {this._renderExpand()}
                {this._renderConfig()}
                <el-button
                  type="primary"
                  onclick={() => {
                    this.$emit("query");
                  }}
                >
                  查 询
                </el-button>
                {this._renderReset()}
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
        <el-button
          type="default"
          onclick={() => {
            this.$emit("reset");
          }}
        >
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
    _renderConfig() {
      if (this.customConfigure) {
        return (
          <el-button
            type="default"
            onclick={() => {
              this.$emit("config");
            }}
          >
            配 置
          </el-button>
        );
      } else {
        return this.configure ? (
          <el-popover placement="bottom" width="400" trigger="click" popper-class="elf-search-table__configure">
            <div class="title">参数配置</div>
            <el-row gutter={20}>
              {this.searchItems.map((item) => {
                return (
                  <el-col span={12}>
                    <el-checkbox
                      class="flex"
                      v-model={item.enable}
                      onchange={(v) => {
                        this.$emit("configureChange", {
                          prop: item.prop,
                          enable: v,
                        });
                      }}
                    >
                      {item.label}
                    </el-checkbox>
                  </el-col>
                );
              })}
            </el-row>
            <el-button style="margin:0 10px" slot="reference">
              配 置
            </el-button>
          </el-popover>
        ) : null;
      }
    },
  },
};
