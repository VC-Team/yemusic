# Using withProviders

We have some providers such as `<FirstProvider></FirstProvider>`, `<SecondProvider></SecondProvider>` and a component will be wraped by them.

To wraped component into providers, we will execute HOC `withProviders` like this: `withProviders(FirstProvider, SecondProvider)(component)`.
