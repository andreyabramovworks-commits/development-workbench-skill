# Frontend and component work

Read the application's actual React version, router, state tools, styling, and component library from manifests and code. Do not impose a template stack.

For a change, trace where data comes from, how it is validated and cached, who owns each piece of state, and how loading, empty, error, and success appear. Keep render logic pure. Derive values during render when possible; use effects for synchronization with external systems. Check effect cleanup, stale closures, and async races. Use composition when a component has independently varying parts; keep a simple prop when it represents one clear behavior. A compound component is useful only when its parts need shared state and flexible structure.

Before performance refactoring, measure or identify a concrete cost: network waterfall, heavy bundle, repeated computation, or render churn. Separate independent requests, load optional heavy code on demand, and avoid broad imports only where the project's bundler and package structure make a difference. Do not add memoization or state layers without evidence.

For shared components, define the public contract: required props, controlled versus uncontrolled state, slots or children, error and disabled behavior, keyboard behavior, and compatibility with existing consumers. Check accessible names and focus after integration. Read [interface.md](interface.md) for visual or interaction work.

Source methods: danielteles React and component API guidance; Vercel React performance and composition patterns; KodMaster React audit. Next.js server rules, React 19 migrations, Redux layout rules, and particular CSS frameworks apply only if the project actually uses them.
