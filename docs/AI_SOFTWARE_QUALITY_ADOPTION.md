# AI Software Quality, Security & Production Readiness — Adoption Checklist

**Canonical governing standard:** https://github.com/ebyron357/AI-Operating-Standards/blob/main/docs/AI_SOFTWARE_QUALITY_SECURITY_MASTER_STANDARD.md

## Audit checklist
- [ ] Visual design tokens, consistent typography, spacing, shadows, radii, gradients, icons and branding.
- [ ] Code debris: duplicated components, unused imports, abandoned pages, conflicting CSS, unnecessary packages, hallucinated APIs.
- [ ] Functional integrity: real buttons, charts, settings, forms, data, links, notifications; no fabricated testimonials or fake production metrics.
- [ ] Responsive and accessibility: mobile navigation, tables, dialogs, keyboard, labels, contrast, screen readers, WCAG 2.2 AA assessment.
- [ ] Security: exposed keys, server-side authn/authz, API permissions, uploads, safe rendering, injection, dependencies, tenant isolation.
- [ ] Data integrity: persistence, schemas, migrations, validation, backups, recovery and retention.
- [ ] Integrations: verified APIs, webhooks, OAuth, retries, limits, handoffs and error recovery.
- [ ] AI agents where present: identity, classification, supervisor, tools, approval gates, JEV, trace, revocation and owner override.
- [ ] Performance and discovery: Core Web Vitals, SEO, GEO, AEO and truthful structured data.
- [ ] Privacy/compliance: applicability and evidence for HIPAA, NIST, government contract requirements; no unsupported certification claims.
- [ ] Testing and deployment: lint, types, build, E2E, security, accessibility, visual regression, CI, rollback and owner signoff.
- [ ] Documentation: architecture, ownership, evidence, defect register and runbooks.

## Execution and acceptance
Record affected path, evidence, reproduction, P0-P3 severity, root cause, proposed repair, test result, owner, approval and status. Inspect first, never invent blockers or completed tests, preserve working systems, use reviewable branches and keep production-release authority with the owner.

**Status: NOT INSPECTED.** This document does not certify compliance or assert that checks have passed.
