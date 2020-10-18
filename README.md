# What is HookStore?
HookStore is an opinionated framework for global state management in your React app. It's based on React Hooks and a reducer concept.

### When should I use it?
Usually, you can avoid using global state in a React app with a clever design. Sometimes though, global state might make things easier or you don't really have a choice.
That's when HookStore comes into play. The goal of HookStore is to give you an easy and fast way for global state management.

### There are already frameworks like Redux. Why should I use HookStore instead?
Redux and other popular frameworks are battle-tested and have proved many times that they are capable of handling complex global states of huge React apps. But sometimes using Redux feels like bringing a nuke to an argument with your neighbor. HookStore is aimed for exactly these situations. You probably won't use it with monstrose React app but it might be just what you need for your small to medium sized React app. You can look at HookStore as a poor Redux cousin.

HookStore is an opinionated framework and was developed with the following ideas in mind:
- You shouldn't need to spend multiple days reading docs before you are able to use HookStore.
- You are using functional components and hooks in your React app.
- The definition of a global state and operations on it should be in the same place for better reasoning and faster navigation.
- It should be straightforward to understand how your global state works.
- You should write only the minimal required code.


