# IA-1 — Ansible deployment

Configure an Ubuntu/Debian managed host using Ansible, deploy the Student Management Portal as a systemd service, place Nginx in front of it, and verify the `/health` endpoint.

## Purpose

Provision a remote Linux VM with Ansible: install Node.js app dependencies, build the app, create a `student-portal` systemd service, install and configure Nginx as a reverse proxy on port 80, and verify `/health`.

## Folder contents

- `playbook.yml` — Ansible playbook
- `inventory.ini` — managed host inventory (edit with your lab VM values)
- `ansible.cfg` — Ansible configuration
- `app/` — standalone Node.js app (build + test payload)
- `files/student-portal/` — app payload copied to the managed host

## Prerequisites

- WSL2 Ubuntu control node with Ansible installed.
- Separate Ubuntu/Debian VM reachable over SSH.
- SSH public-key authentication and sudo access for the inventory user.
- Python 3 and Node.js 20+ installed on the managed VM (the playbook checks Node.js; it does not install it).
- Replace the example host address/user/key in `inventory.ini` with your lab values. Do **not** commit a private key.

## Run from this directory

```bash
ansible --version
ansible-inventory --graph
ansible web -m ansible.builtin.ping
ansible-playbook playbook.yml --syntax-check
ansible-playbook playbook.yml --diff
ansible-playbook playbook.yml
```

## Verify on the managed host

```bash
sudo systemctl is-active student-portal
sudo systemctl is-active nginx
sudo nginx -t
curl -i http://127.0.0.1/health
```

Open `http://<MANAGED_VM_IP>/` from a machine that can reach the VM.

## Test the application separately

```bash
cd app && npm ci && npm run build && npm test
```

Student records are stored in process memory and reset when the application restarts; this is coursework demonstration code, not a production database.
