resource "huaweicloud_vpc" "vpc_5d" {
  name = "my_custom_vpc"
  cidr = "10.0.0.0/16"
} 

output "subnet_ipv4_cidr" {
  value = huaweicloud_vpc_subnet.subnet_5d.cidr
}