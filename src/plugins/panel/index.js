import PanelComponent from "./Panel.vue";
import CategoryComponent from "./Category.vue";
import CityComponent from "./City.vue";

const Panel = {
  install(Vue) {
    Vue.component(PanelComponent.name, PanelComponent);
    Vue.component(CategoryComponent.name, CategoryComponent);
    Vue.component(CityComponent.name, CityComponent);
  },
};

export default Panel;
