# MITAOE Cloud Native DevOps — Assignment Source Code

This ZIP contains the requested assignment-wise structure:
- `ia_1_code/` — Ansible automation and its standalone app payload.
- `ia_2_code/` — Dockerfile, Kubernetes manifests and standalone app.
- `ia_3_code/` — Jenkinsfile, Terraform configuration and standalone app.

All assignments implement the same Student Management Portal API:
- `GET /health`
- `GET /api/students`
- `POST /api/students` with JSON fields `name`, `email`, `course`
- `GET /` for the browser interface

## Run application checks
Inside each assignment folder:
```bash
cd app   # IA-1 / IA-2
# For IA-3, run npm commands from the assignment root.
npm ci
npm run build
npm test
```
IA-3 app is at its project root, matching the Jenkinsfile and Terraform pipeline.

## Important
Infrastructure commands require local tools and infrastructure. Ansible needs a reachable managed Linux host; Docker/Kubernetes need an engine and cluster; Jenkins needs a configured controller/agent; Terraform needs provider download access. Configuration files and run instructions are included, but the archive does not claim those external services have been executed. Replace sample inventory host values with your actual lab VM details. No passwords, private keys or API tokens are included.
