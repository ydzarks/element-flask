import Style from "../packages/style";
import Tag from "../packages/tag";
import SearchForm from "../packages/searchForm";
import SearchItem from "../packages/searchItem";

const components = [Tag, SearchForm, SearchItem];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window != undefined && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.1.0",
  install,
  Style,
  Tag,
};
