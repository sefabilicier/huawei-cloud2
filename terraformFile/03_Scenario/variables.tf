variable "elif_vpc" {
  default = "vpc-basic"
}
variable "vpc_cidr" {
  default = "192.168.0.0/16"
}
variable "subnet_web" {
  default = "subnet-basic"
}
variable "subnet_cidr" {
  default = "192.168.10.0/24"
}
variable "subnet_gateway" {
  default = "192.168.10.1"
}
