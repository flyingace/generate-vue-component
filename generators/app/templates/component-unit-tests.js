import { shallowMount } from "@vue/test-utils";
import <%= pascalComponentName %> from './<%= pascalComponentName %>.vue';

describe("<%= pascalComponentName %>", () => {
  test("renders without crashing", () => {
    const wrapper = shallowMount(<%= pascalComponentName %>);
    expect(wrapper.exists()).toBe(true);
  });
});
