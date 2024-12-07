variable "elif_vpc" {
  default = "vpc-basic"
}
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
variable "subnet_web" {
  default = "subnet-basic"
}
variable "subnet_cidr" {
  default = "10.0.0.0/24"
}
variable "subnet_gateway" {
  default = "10.0.0.1"
}
