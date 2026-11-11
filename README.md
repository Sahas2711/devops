# devops — Cloud Native DevOps Assignments

Student Management Portal API implemented across three DevOps assignments:

| Assignment | Folder | Focus |
|---|---|---|
| IA-1 | `Ansible_Automation/` | Ansible provisioning + Nginx reverse proxy + systemd service |
| IA-2 | `Docker_k8s/` | Docker containerization + Kubernetes manifests |
| IA-3 | `terraform_ci-cd/` | Jenkins CI/CD pipeline + Terraform (local provider) infrastructure |

## API endpoints

All assignments expose the same Student Management Portal:

- `GET /` — browser interface
- `GET /health` — health check
- `GET /api/students` — list students
- `POST /api/students` — create student (`name`, `email`, `course`)

Student records are stored in process memory and reset on restart; this is coursework demonstration code, not a production database.

## Quick start

Each assignment folder contains its own README with setup, build, deploy, and cleanup steps.

```bash
# IA-1 — Ansible
cd Ansible_Automation
# edit inventory.ini with your lab VM, then:
ansible-playbook playbook.yml

# IA-2 — Docker / Kubernetes
cd Docker_k8s
docker build -t student-management-portal:1.0.0 .
docker run --rm -d -p 3000:3000 student-management-portal:1.0.0

# IA-3 — Jenkins CI/CD + Terraform
cd terraform_ci-cd
npm ci && npm run build && npm test
cd infra/terraform && terraform init && terraform plan
```

## Important

Infrastructure commands require local tools and infrastructure:

- Ansible needs a reachable managed Linux host.
- Docker/Kubernetes need a container engine and cluster.
- Jenkins needs a configured controller/agent.
- Terraform needs provider download access.

Replace sample inventory host values with your actual lab VM details. No passwords, private keys, or API tokens are included.

## Repository structure

```
devops/
├── README.md
├── FILE_MANIFEST.json
├── VALIDATION_REPORT.txt
├── Ansible_Automation/          # IA-1
│   ├── inventory.ini
│   ├── playbook.yml
│   ├── ansible.cfg
│   ├── app/                     # standalone Node.js app payload
│   └── files/student-portal/    # app payload copied by playbook
├── Docker_k8s/                  # IA-2
│   ├── Dockerfile
│   ├── k8s/deployment.yaml
│   ├── k8s/service.yaml
│   └── app/
└── terraform_ci-cd/             # IA-3
    ├── Jenkinsfile
    ├── package.json
    ├── server.js
    ├── public/
    ├── test/
    ├── scripts/
    └── infra/terraform/
```
