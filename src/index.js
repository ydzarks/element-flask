import Style from "../packages/style";
import Tag from "../packages/tag";
import SearchForm from "../packages/searchForm";
import SearchItem from "../packages/searchItem";
import SearchTable from "../packages/searchTable";

const components = [Tag, SearchForm, SearchItem, SearchTable];

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$ELEMENTFLASK = {
    queryProps: {
      order: opts?.queryProps?.order || "order",
      orderBy: opts?.queryProps?.orderBy || "orderBy",
      page: opts?.queryProps?.page || "page",
      pageSize: opts?.queryProps?.pageSize || "pageSize",
    },
  };
};

if (typeof window != undefined && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.1.0",
  install,
  Style,
  getComponents: () => {
    return components;
  },
};
