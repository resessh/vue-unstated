import { createLocalVue, mount } from '@vue/test-utils';
import VueCompositionApi, {
  reactive,
  defineComponent,
} from '@vue/composition-api';
import { createContainer } from '../src';

// type
import { CreateElement } from 'vue';

const localVue = createLocalVue();
localVue.use(VueCompositionApi);

describe('useContainer', () => {
  // disable error logs.
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      /* noop */
    });
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const container = createContainer(
    (initialState: { count: number } = { count: 0 }) => {
      const state = reactive(initialState);
      const increment = () => {
        state.count++;
      };

      return { state, increment };
    }
  );

  it('should work.', () => {
    const ChildComponent = defineComponent({
      setup() {
        const { state, increment } = container.useContainer();

        return { state, increment };
      },
      template: `<button @click="increment"/>`,
    });

    const ParentComponent = defineComponent({
      components: { ChildComponent },
      setup() {
        container.provide();
      },
      template: `<ChildComponent/>`,
    });

    const ParentWrapper = mount(ParentComponent, { localVue });
    const ChildWrapper = ParentWrapper.findComponent(ChildComponent);
    // @ts-ignore
    expect(ChildWrapper.vm.state.count).toBe(0);
    ChildWrapper.find('button').trigger('click');
    // @ts-ignore
    expect(ChildWrapper.vm.state.count).toBe(1);
  });

  it('should work with initial props.', () => {
    const ParentComponent = defineComponent({
      setup() {
        const { state } = container.provide({
          initialState: { count: 3 },
        });

        return { state };
      },
      template: `<div/>`,
    });

    const ParentWrapper = mount(ParentComponent, { localVue });
    expect(ParentWrapper.vm.state.count).toBe(3);
  });

  it('throws when used in a component not provided.', () => {
    const ChildComponent = defineComponent({
      setup() {
        const { state, increment } = container.useContainer();

        return { state, increment };
      },
      template: `<div/>`,
    });

    const ParentComponent = defineComponent({
      setup() {
        container.provide();
      },
      template: `<div/>`,
    });

    mount(ParentComponent, { localVue });
    expect(() => {
      mount(ChildComponent, { localVue });
    }).toThrowError();
  });
});
