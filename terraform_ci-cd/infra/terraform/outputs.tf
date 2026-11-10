output "deployment_record_path" {
  description = "Absolute path of the local file created by Terraform."
  value       = local_file.deployment_record.filename
}
