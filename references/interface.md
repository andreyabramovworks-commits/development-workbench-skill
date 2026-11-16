# Interface, design, and accessibility

Before redesigning, learn the product's audience, main jobs, content, existing visual language, and constraints. Compare current screens and states, not just an isolated screenshot. State a compact visual direction: type scale, colors, spacing, layout rhythm, surfaces, and interaction principles. Reuse or refine the existing design system when it meets the task; document new tokens only when the change needs reusable values.

Build the content hierarchy from actual tasks. Review desktop and narrow layouts, loading, empty, validation, error, and success states. Check focus visibility, keyboard sequence, labels, names, contrast, and motion. Use semantic HTML first; consult the [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for complex widgets. A static screenshot cannot establish accessible behavior.

For a component with several important states, list the states its code can actually reach: loading, empty, error, typical data, long data, disabled, and relevant role or permission variants. Render the real component with representative data at its normal boundary in a temporary local workbench when visual inspection needs repeatable switching. Remove the workbench after review unless the project keeps such examples deliberately. Do not add impossible states merely to fill a checklist.

Avoid generic visual patterns that obscure the product's own content. Choose typography, imagery, color, and layout intentionally, but do not force a distinctive aesthetic on an established enterprise interface. Evaluate clarity, consistency, and usability in the actual application before decorative novelty.

Source methods: Anthropic frontend-design (process and subject grounding), LeorickCoder design-system (primitive → semantic → component tokens), danielteles accessibility, Vercel web design guidance, KodMaster UI audit. These are synthesized methods; no external design database or live guideline fetch is required for ordinary work.
