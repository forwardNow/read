# 上下文

Context 提供了一种通过组件树传递数据的方法，而无需在每个级别手动传递 props。

在典型的 React 应用程序中，数据通过 props 自上而下传递（父传子），但这对于应用程序中许多组件所需的某些类型的 props（例如区域设置首选项、UI 主题）来说可能很麻烦。 Context 提供了一种在组件之间共享这些值的方法，而无需通过树的每个级别显式传递 prop。

## 1. 何时使用 Context

Context 旨在共享可被视为 React 组件树的“全局”数据，例如当前经过身份验证的用户、主题或首选语言。 例如，在下面的代码中，我们手动一层一层向下传递 `theme` prop 来设置 Button 组件的样式：

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 context，我们可以避免通过中间元素传递 props：

```jsx
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## 2. 在使用 context 之前

context 主要用于当一些数据需要在不同的嵌套级别上被许多组件访问时。 谨慎应用它，因为它使组件重用更加困难。

如果您只想避免逐层传递 prop，那么[组件组合](https://reactjs.org/docs/composition-vs-inheritance.html)通常比上下文更简单。

例如，考虑一个传递用户的页面组件和avatarSize支持几个级别，以便深层嵌套的链接和头像组件可以读取它：

例如，一个 `Page` 组件，向下层传递 `user`、`avatarSize` 属性，以便嵌套很深的的 `Link` 、 `Avatar` 组件可以读取它：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果最终只有 `Avatar` 组件确实需要它，那么将 `user` 和 `avatarSize` prop 传递给多个级别可能会感到多余。 同样令人讨厌的是，当 `Avatar` 组件从顶部需要更多 prop 时，您也必须在所有中间级别添加它们。

在没有上下文的情况下解决此问题的一种方法是传递 `Avatar` 组件本身，以便中间组件不需要知道 `user` prop：

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

通过此更改，只有最顶层的 `Page` 组件需要了解 `Link` 和 `Avatar` 组件对 `user` 和 `avatarSize` 的使用。

在许多情况下，这种控制反转可以使代码更加清晰，它减少需要要传递的 prop 的数量并对根组件进行更多控制。 但是，这不能在所有场景使用：将负责度转移到更高层级的组件，会使底层组件更灵活且难掌控。

一个组件可以由多个子组件。您可以传递多个孩子，甚至可以为孩子们分别设置多个“插槽”，如下所示：

```jsx
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

当需要解耦父子组件时，这种方式可以满足大多数情况。如果子组件在渲染之前需要与父组件通信，可以使用 props 属性。

但是，有时需要树中的许多（不同的嵌套级别的）组件可以访问相同的数据。 上下文允许您将此类数据“广播”到下面的所有组件并对其进行更改。 上下文主要应用于，如管理当前 locale、theme、数据缓存。

## 3. API

### 3.1. `React.createContext`

```jsx
const MyContext = React.createContext(defaultValue);
```

创建 Context 对象。 当 React 呈现一个订阅此 Context 对象的组件时，它将从树中它上面最接近的匹配 `Provider` 读取当前上下文值。

`defaultValue` 参数仅在组件在树中没有匹配的 `Provider` 时使用。 这可以帮助单独测试组件而不需要嵌入。 注意：将 `undefined` 作为 `Provider` 值传递不会导致组件使用 `defaultValue`。

### 3.2. `Context.Provider`

```jsx
<MyContext.Provider value={/* some value */}>
```

每个 Context 对象都附带一个 Provider React 组件，允许使用组件来订阅上下文更改。

接受 `value` prop，将其传递给此 Provider 的后代的消费组件。 一个提供商可以连接到许多消费者，也可以进行嵌套以覆盖树中更深层的值。

作为提供者后代的所有消费者将在提供者的 `value` prop 发生变化时重新渲染。 从 Provider 到其后代使用者的传播不受 `shouldComponentUpdate` 方法的约束，因此即使祖先组件退出更新，也会更新使用者。

通过使用与 `Object.is` 相同的算法比较新旧值来确定更改。

>注意
>
>确定更改的方式可能会在将对象作为值传递时导致一些问题：请参阅[警告](https://reactjs.org/docs/context.html#caveats)。

### 3.3. `Class.contextType`

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of MyContext */
  }
}
MyClass.contextType = MyContext;
```

可以为类上的 `contextType` 属性分配由 `React.createContext()` 创建的 Context 对象。 这允许您使用 `this.context` 使用该 Context 类型的最近的当前值。 您可以在任何生命周期方法中引用它，包括 `render` 函数。

>注意：
>
>您只能使用此 API 订阅单个上下文。 如果您需要阅读多个，请参阅[使用多个上下文](https://reactjs.org/docs/context.html#consuming-multiple-contexts)。
>
>如果您使用的是实验性[公共类字段语法](https://babeljs.io/docs/plugins/transform-class-properties/)，则可以使用静态类字段初始化 `contextType`。

```jsx
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
```

### 3.4. `Context.Consumer`

```jsx
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

订阅上下文更改的 React 组件。 这使您可以在函数组件中的订阅上下文。

需要作为子组件的函数组件。 该函数接收当前上下文值并返回 React 节点。 传递给函数的 value 参数将等于树中上述此上下文的最近 Provider 的 `value` prop。 如果上面没有此上下文的 Provider，则 `value` 参数将等于传递给 `createContext()` 的 `defaultValue`。

>注意
>
>有关“作为子组件的函数”模式的更多信息，请参阅[渲染 props](https://reactjs.org/docs/render-props.html)。

## 4. 示例

### 4.1. 动态上下文

一个更复杂的示例，包含主题的动态值：

**theme-context.js**：

```jsx
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
```

**themed-button.js**:

```jsx
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```

**app.js**：

```jsx
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```

### 4.2. 从嵌套组件更新上下文