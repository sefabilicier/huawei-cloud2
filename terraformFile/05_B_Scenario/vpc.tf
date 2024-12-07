resource "huaweicloud_vpc" "vpc_5b" {
  name = "my_custom_vpc_5b"
  cidr = "10.0.0.0/16"
}
output "subnet_ipv4_cidr" {
  value = huaweicloud_vpc_subnet.subnet_5b.cidr  
}
