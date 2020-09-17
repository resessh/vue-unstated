import { provide as _provide, inject, InjectionKey } from 'vue-demi';

export type ContainerProviderProps<State = void> = {
  initialState?: State;
};

export type Container<Value, State = void> = {
  provide: (props?: ContainerProviderProps<State>) => Value;
  useContainer: () => Value;
};

export function createContainer<Value, State = void>(
  useComposition: (initialState?: State) => Value
): Container<Value, State> {
  let providerSymbol: InjectionKey<Value>;

  function provide(props?: ContainerProviderProps<State>): Value {
    providerSymbol = Symbol();
    const value = useComposition(props && props.initialState);
    _provide<Value>(providerSymbol, value);

    return value;
  }

  function useContainer(): Value {
    const value = inject(providerSymbol);
    if (!value) {
      throw new Error('Container must be used in provided Component.');
    }
    return value;
  }

  return { provide, useContainer };
}
