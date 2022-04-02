import Tag from "../packages/tag";

const components = [Tag];

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
  Tag,
};
