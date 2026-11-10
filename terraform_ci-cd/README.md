# IA-3 — Jenkins CI/CD + Terraform

## Structure
The application is at the project root (`server.js`, `public/`, `package.json`, `test/`, `scripts/`). `Jenkinsfile` is at repository root for Pipeline-from-SCM. Terraform files are in `infra/terraform/`.

## Prerequisites
- Git repository containing this folder's contents at repository root.
- Jenkins with Pipeline and Git plugins.
- Linux Jenkins agent with Git, Node.js 20+, npm, curl and Terraform 1.5+.
- Agent network access to download the HashiCorp local provider during `terraform init`.
- Store repository credentials in Jenkins Credentials, never in source.

## Configure Jenkins
Create **New Item → Pipeline**. Select **Pipeline script from SCM**, Git, repository URL, branch `*/main`, and Script Path `Jenkinsfile`. Save, then Build Now. Inspect Console Output and stage view.

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
The pipeline performs Checkout, Build, Test, Terraform Init, Format/Validate, Plan, Apply, Deploy and Verify. The app is started on port 3100 for the health check and stopped by the `post` cleanup. The Terraform local-file resource remains in state until destroyed. Student data is in-memory and not durable.
