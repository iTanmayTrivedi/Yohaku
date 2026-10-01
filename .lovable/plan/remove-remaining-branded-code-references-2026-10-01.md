# Remove remaining branded code references

## Changes
- Replace remaining internal bridge naming with a neutral error-reporting adapter while preserving the injected runtime key.
- Use a neutral local package alias for the required hosted-editor Vite preset.
- Keep required platform metadata and dependency source identifiers only where removing them would break preview, installs, or deployment.
- Verify the unchanged portfolio on desktop and mobile, including loading, scrolling, and dock interactions.

## Technical details
- No visual, animation, content, or interaction code will be redesigned.
- Search generated and hidden project files separately so platform-owned metadata is not mistaken for app source.
- Apply the required dependency security versions and confirm the latest preview build is healthy.
