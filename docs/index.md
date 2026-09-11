---
layout: home

hero:
  name: UAIF
  text: Universal Application Integration Framework
  tagline: Build stable application integrations without coupling application code to provider-specific implementations.
  image:
    src: /brand/uaif-symbol.svg
    alt: UAIF
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/coderooz/uaif

features:
  - icon: 🔌
    title: Provider-Agnostic
    details: Abstract application code behind stable contracts. Swap providers without rewriting business logic.
  - icon: 📦
    title: Modular Architecture
    details: Core contracts, provider registry, compatibility engine, and framework adapters — each independently composable.
  - icon: 🛠️
    title: CLI Tooling
    details: Detect your project environment, list registered providers, and validate integration state from the command line.
  - icon: 🔄
    title: Compatibility Engine
    details: Automatic provider-target compatibility checking with migration guidance and version-aware resolution.
  - icon: 📋
    title: Integration Manifest
    details: Declarative `uaif.json` manifests track provider choices and enable automated validation.
  - icon: 🧩
    title: Framework Adapters
    details: First-class adapters for React, Next.js, and Expo with provider-specific implementations for Clerk, Firebase, MongoDB, and Cloudinary.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%);
}

.VPHero .name {
  background: var(--vp-home-hero-name-background) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
}

.VPHero .text {
  color: var(--vp-c-text-2);
}

.VPHero .tagline {
  font-size: 18px !important;
  line-height: 1.6 !important;
  max-width: 560px !important;
}

.VPFeature {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
}

.VPFeature .title {
  font-weight: 600 !important;
}
</style>
