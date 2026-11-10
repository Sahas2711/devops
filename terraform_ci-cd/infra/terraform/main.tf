resource "local_file" "deployment_record" {
  filename = "${path.module}/deployment-record.txt"
  content = jsonencode({
    application = var.application_name
    version     = var.application_version
    provisioned = "terraform"
    purpose     = "local CI/CD deployment evidence"
  })
  file_permission = "0644"
}
