# IA-3 — Jenkins CI/CD + Terraform

Run a Jenkins Pipeline that builds, tests, provisions infrastructure with Terraform, deploys the app, and verifies health.

## Purpose

A Jenkins Pipeline-from-SCM that performs Checkout → Build → Test → Terraform Init → Format/Validate → Plan → Apply → Deploy → Verify. The app is started on port 3100 for the health check and stopped by the `post` cleanup.

## Folder contents

- `Jenkinsfile` — Jenkins Pipeline definition (Pipeline-from-SCM)
- `package.json`, `package-lock.json` — Node.js app manifest
- `server.js`, `public/`, `scripts/`, `test/` — standalone Node.js app
- `infra/terraform/` — Terraform configuration (local provider)

## Prerequisites

- Git repository containing this folder's contents at repository root.
- Jenkins with Pipeline and Git plugins.
- Linux Jenkins agent with Git, Node.js 20+, npm, curl, and Terraform 1.5+.
- Agent network access to download the HashiCorp local provider during `terraform init`.
- Store repository credentials in Jenkins Credentials; never in source.

## Configure Jenkins

1. Create **New Item → Pipeline**.
2. Select **Pipeline script from SCM**, Git, repository URL, branch `*/main`.
3. Set Script Path to `Jenkinsfile`. Save, then **Build Now**.
4. Inspect Console Output and stage view.

## Test locally

```bash
npm ci
npm run build
npm test
```

## Run Terraform manually

```bash
cd infra/terraform
terraform init -input=false
terraform fmt -check -recursive
terraform validate
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan
cat deployment-record.txt
terraform state list
terraform destroy
```

Terraform provisions a real local filesystem resource (`local_file.deployment_record`) to avoid paid cloud infrastructure. This is not an AWS VM or other cloud resource. `terraform destroy` removes the file.

## Pipeline behavior

The pipeline performs Checkout, Build, Test, Terraform Init, Format/Validate, Plan, Apply, Deploy, and Verify. The app is started on port 3100 for the health check and stopped by the `post` cleanup. The Terraform local-file resource remains in state until destroyed. Student data is in-memory and not durable.
