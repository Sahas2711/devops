variable "application_name" {
  description = "Logical application name recorded by the local provisioning resource."
  type        = string
  default     = "student-management-portal"
}
variable "application_version" {
  description = "Version label included in the deployment metadata."
  type        = string
  default     = "1.0.0"
}
